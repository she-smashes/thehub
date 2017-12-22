'use strict';

module.exports = function(UserBadge) {
  /**
   * If invoked from List User Badges,
   * This method is used to find x badges to be shown for the user.
   * The x is the sum of user badges + default badges if required.
   *
   * If invoked from List SystemBadges,
   * This method just returns all the user badges without any limit.
   *
   * @param {*} ctx
   * @param {*} resolve
   */
  var getBadgesForUser = function(ctx, resolve, limit) {
    if (limit) {
      UserBadge.find({
        where: {
          userId: ctx.req.accessToken.userId,
        },
        include: [{
          user: ['scores'],
        }, {
          badge: {
            level: ['category'],
          },
        }],
        limit: ctx.req.configs[0].value,
      }, function(err, userBadges) {
        resolve(userBadges);
      });
    } else {
      UserBadge.find({
        where: {
          userId: ctx.req.accessToken.userId,
        },
        include: [{
          user: ['scores'],
        }, {
          badge: {
            level: ['category'],
          },
        }],
      }, function(err, userBadges) {
        resolve(userBadges);
      });
    }
  };

  /**
  * This remote method is used to list the x badges.
  * The x is the sum of user badges + default badges if required.
  */
  UserBadge.listUserBadges = function(ctx, cb) {
    // Find the list of user badges with the user, score, level and category details.
    // Limit the result set to the configured x
    Promise.resolve(new Promise(function(resolve) {
      getBadgesForUser(ctx, resolve, true);
    })).then((userBadges) => {
      // Process the user badges returned
      processUserBadges(userBadges, ctx.req.configs[0].value, cb);
    });
  };

  /**
   * This method processes the list of badges returned for the user.
   * If the count is less than the configured number, it adds some default badges to it.
   * @param {*} userBadges
   * @param {*} totalNoOfBadges
   * @param {*} cb
   */
  function processUserBadges(userBadges, totalNoOfBadges, cb) {
    let uBadges = [];
    let usBadges = [];
    uBadges = uBadges.concat(userBadges);
    usBadges = usBadges.concat(userBadges);
    if (uBadges.length < totalNoOfBadges) {
      // Find the no of default badges required = Total number of badges (x) - user badges
      // Limit the result set to the configured x
      let noOfDefaultBadges = totalNoOfBadges - uBadges.length;
      let index = 0;
      const promises = [];
      // Iterate over the userbadges
      uBadges.forEach(function(uBadge) {
        if (index < noOfDefaultBadges) {
          // This is a limitation in loopback where relation properties.
          // They have to be converted using .toJSON() method
          uBadge = uBadge.toJSON();
          promises.push(new Promise(function(resolve) {
            // Get the badges for the next level in the same badge category
            getNextLevelBadges(parseInt(uBadge.badge.level.sequence) + 1,
              uBadge.badge.level.categoryId, resolve);
          }));
          ++index;
        }
      });
      Promise.all(promises).then((response) => {
        response.forEach(function(resp) {
          let tempBadges = {
            'badge': resp.toJSON(),
          };
          // Get the points for the next level
          tempBadges.pointsForNextLevel = tempBadges.badge.level.pointsEndRange;
          usBadges = usBadges.concat(tempBadges);
        });
        let defaultPromises = [];
        // Check if the
        // sum of user badges + default badges of the next level of the user badges = x, the configuration
        // If not get the default badges from any category to return total x badges
        if (usBadges.length < totalNoOfBadges) {
          defaultPromises.push(new Promise(function(resolve) {
            getDefaultBadges(resolve);
          }));
          Promise.all(defaultPromises).then((defResponse) => {
            let noOfDefBadges = totalNoOfBadges - usBadges.length;
            let defBadges = processDefaultBadges(defResponse[0],
              uBadges, noOfDefBadges);
            usBadges = usBadges.concat(defBadges);
            cb(null, usBadges);
          });
        } else {
          cb(null, usBadges);
        }
      });
    } else {
      cb(null, uBadges);
    }
  }

  /**
   * This method processes the default list of badges returned.
   * It checks if the user list already contains this badge.
   * Returns the default badge only if not already present.
   *
   * @param {*} defaultResponse
   * @param {*} usBadges
   * @param {*} uBadges
   * @param {*} noOfDefaultBadges
   */
  function processDefaultBadges(defaultResponse, uBadges, noOfDefaultBadges) {
    let index = 0;
    let defaultBadges = [];
    defaultResponse.forEach(function(resp) {
      resp = resp.toJSON();
      if (index < noOfDefaultBadges) {
        let foundCat = false;
        uBadges.forEach(function(uBadge) {
          uBadge = uBadge.toJSON();
          // Check if user already has a badge in this category
          if (uBadge.badge.level.categoryId == resp.categoryId) {
            foundCat = true;
          }
        });
        // Add to the default list only if the user does not have a badge in this category
        if (!foundCat) {
          let tempBadges = {
            'badge': resp,
          };
          defaultBadges = defaultBadges.concat(tempBadges);
          ++index;
        }
      }
    });
    return defaultBadges;
  }

  /**
   * This method is used to get the badges for the next level in a category.
   * The next level is identified using the sequence of the level.
   * @param {*} nextLevelSequence
   * @param {*} categoryId
   * @param {*} resolve
   */
  var getNextLevelBadges = function(nextLevelSequence, categoryId, resolve) {
    // Get the next level using the categoryId and the sequence
    UserBadge.app.models['Level'].find({
      where: {
        sequence: nextLevelSequence,
        categoryId: categoryId,
      },
    }, function(err, nextLevel) {
      // Get the badge for the next level identified
      UserBadge.app.models['Badge'].find({
        where: {
          levelId: nextLevel[0].id,
        },
        include: {
          level: ['category'],
        },
        limit: 1,
      }, function(err, badges) {
        resolve(badges[0]);
      });
    });
  };

  /**
   * This method is used to get the configuration value no_of_badges_in_widget.
   * This happens before the remote method executes.
   */
  UserBadge.beforeRemote('listUserBadges', function(context, unused, next) {
    UserBadge.app.models.config.find({
      where: {name: 'no_of_badges_in_widget'},
    },
      function(err, configs) {
        context.req.configs = configs;
        next();
      });
  });

  /**
  *  This remote method is used to list the x badges.
  */
  UserBadge.remoteMethod('listUserBadges', {
    accepts: [
      {arg: 'ctx', type: 'object', http: {source: 'context'}},
    ],
    http: {
      path: '/list-user-badges',
      verb: 'get',
    },
    returns: {
      arg: 'badges',
      type: 'array',
    },
  });

  /**
  * This remote method is used to list all the system badges.
  * It also contains the details about the user obtained badges info in it.
  */
  UserBadge.listSystemBadges = function(ctx, cb) {
    let userIdValue = ctx.req.accessToken.userId;

    // Find the list of user badges with the user, score, level and category details.
    // Limit the result set to the configured x
    Promise.resolve(new Promise(function(resolve) {
      getBadgesForUser(ctx, resolve, false);
    })).then((userBadges) => {
      // Process the user badges returned
      let usBadges = [];
      let defaultPromises = [];

      // Get the list of all system badges for all categories and levels
      defaultPromises.push(new Promise(function(resolve) {
        getAllBadges(resolve);
      })
      );
      Promise.all(defaultPromises)
        .then((defaultResponse) => {
          defaultResponse[0].forEach(function(resp) {
            resp = resp.toJSON();
            userBadges.forEach(function(uBadge) {
              uBadge = uBadge.toJSON();

              // Check if the user allready has this badge in the system badge list
              if (uBadge.badge.id == resp.id) {
                resp.userId = uBadge.userId;
                resp.user = uBadge.user;
              }
            });
            let tempBadges = {
              'badge': resp,
            };

            // Push the user details into the system badge is user has obtained it.
            if (resp.userId !== undefined && resp.userId !== '') {
              tempBadges.userId = resp.userId;
              tempBadges.user = resp.user;
              delete resp.userId;
              delete resp.user;
            } else {
              tempBadges.pointsForNextLevel =
                tempBadges.badge.level.pointsEndRange;
            }
            usBadges = usBadges.concat(tempBadges);
          });

          // Group the badges by category before returning
          let categoryGroup = groupByCategory(usBadges);

          // Return the group
          cb(null, categoryGroup);
        });
    });
  };

  /**
  * This method is used to group the badges by category Ids.
  */
  var groupByCategory = function(usBadges) {
    let categoryGroup = {};
    usBadges.forEach(function(resp) {
      if (categoryGroup[resp.badge.level.categoryId] != undefined) {
        let catArr = categoryGroup[resp.badge.level.categoryId];
        catArr.push(resp);
        categoryGroup[resp.badge.level.categoryId] = catArr;
      } else {
        let catArr = [];
        catArr.push(resp);
        categoryGroup[resp.badge.level.categoryId] = catArr;
      }
    });

    return categoryGroup;
  };

  /**
  * This method returns the list of all default system badges for all the categories.
  * This is nothing but the lowest badge in the category.
  */
  var getDefaultBadges = function(resolve) {
    UserBadge.app.models['Badge'].find({
      where: {
        default: true,
      },
      include: {
        level: ['category'],
      },
    }, function(err, badges) {
      resolve(badges);
    });
  };

  /**
  * This method returns the list of all system badges for all the categories.
  */
  var getAllBadges = function(resolve) {
    UserBadge.app.models['Badge'].find({
      include: {
        level: ['category'],
      },
    }, function(err, badges) {
      resolve(badges);
    });
  };

  /**
  * This remote method returns the list of all default system badges for all the categories.
  */
  UserBadge.remoteMethod('listSystemBadges', {
    accepts: [
      {arg: 'ctx', type: 'object', http: {source: 'context'}},
    ],
    http: {
      path: '/list-system-badges',
      verb: 'get',
    },
    returns: {
      arg: 'badges',
      type: 'array',
    },
  });

  /**
  * This method returns the list of all next levels for the categoryId passed.
  * The result which is the next levels is appended to the score object.
  * This is to access the current score  and the next level easily.
  */
  var getNextLevelsInCategories = function(score, categoryId, resolve) {
    UserBadge.app.models['Level'].find({
      where: {
        categoryId: categoryId,
      },
    }, function(err, nextLevels) {
      score.levels = nextLevels;
      resolve(score);
    });
  };

  /**
  * This remote method returns the list of all categories where the user has scored points.
  */
  UserBadge.listUserCategories = function(ctx, cb) {
    let userIdValue = ctx.req.accessToken.userId;
    // Get the list of all score objects for the user in each category
    let configs = ctx.req.configs;
    UserBadge.app.models.score.find({
      where: {
        userId: userIdValue,
      },
      include: ['category'],
      limit: configs[0].value,
    }, function(err, userScores) {
      const promises = [];
      const categoryIdArr = [];
      if (userScores != undefined) {
        userScores.forEach(function(score) {
          categoryIdArr.push(score.categoryId);
          // Get the next levels for each of the categories where the user has participated
          promises.push(new Promise(function(resolve) {
            getNextLevelsInCategories(score, score.categoryId, resolve);
          }));
        });
        let noOfCategories = configs[0].value;
        // Find the no of default categories that has to be returned.
        // This is apart from the user participated ones.
        let noOfDefaultCategories = noOfCategories - userScores.length;
        const catPromises = [];
        if (noOfDefaultCategories > 0) {
          catPromises.push(new Promise(function(resolve) {
            // Get the categories list
            UserBadge.app.models.category.find({
              limit: configs[0].value,
            }, function(err, categories) {
              resolve(categories);
            });
          }));
          Promise.all(catPromises).then((response) => {
            let index = 0;
            response[0].forEach(function(category) {
              if (index < noOfDefaultCategories) {
                // Check if the user has participated in this category
                if (categoryIdArr.indexOf(category.id) == -1) {
                  let score = {};
                  score.category = category;
                  score.categoryId = category.id;
                  index++;
                  // Get the list of all levels for this default category
                  promises.push(new Promise(function(resolve) {
                    getNextLevelsInCategories(score, category.id, resolve);
                  }));
                }
              }
            });
            Promise.all(promises).then((response) => {
              cb(null, response);
            });
          });
        } else {
          Promise.all(promises).then((response) => {
            cb(null, response);
          });
        }
      } else {
        cb(null);
      }
    });
  };

  /**
  * This method is used to get the configuration value no_of_categories_in_widget.
  * This happens before the remote method executes.
  */
  UserBadge.beforeRemote('listUserCategories', function(context, unused, next) {
    UserBadge.app.models.config.find({
      where: {name: 'no_of_categories_in_widget'},
    },
      function(err, configs) {
        context.req.configs = configs;
        next();
      });
  });

  /**
  * This remote method is used to get the list of all categories for the user.
  * This list includes the sum of user scored categories + default categories.
  */
  UserBadge.remoteMethod('listUserCategories', {
    accepts: [
      {arg: 'ctx', type: 'object', http: {source: 'context'}},
    ],
    http: {
      path: '/list-user-categories',
      verb: 'get',
    },
    returns: {
      arg: 'categories',
      type: 'array',
    },
  });
};
