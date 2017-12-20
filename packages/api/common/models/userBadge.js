'use strict';

module.exports = function(UserBadge) {
  /**
  *  This remote method is used to list the x badges.
  * The x is the sum of user badges + default badges if required.
  */
  UserBadge.listUserBadges = function(ctx, cb) {
    let userIdValue = ctx.req.accessToken.userId;

    let configs = ctx.req.configs;

    // Find the list of user badges with the user, score, level and category details.
    // Limit the result set to the configured x
    UserBadge.find({
      where: {
        userId: userIdValue,
      },
      include: [
        {
          user: ['scores'],
        },
        {
          badge: {
            level: ['category'],
          },
        }],
      limit: configs[0].value,
    }, function(err, userBadges) {
      let uBadges = [];
      let usBadges = [];
      uBadges = uBadges.concat(userBadges);
      usBadges = usBadges.concat(userBadges);
      if (uBadges.length < configs[0].value) {
        // Find the no of default badges required
        // Total number of badges - user badges
        // Limit the result set to the configured x
        let noOfDefaultBadges = configs[0].value - uBadges.length;
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
                uBadge.badge.level.categoryId, configs, resolve);
            })
            );
            ++index;
          }
        });
        Promise.all(promises)
          .then((response) => {
            response.forEach(function(resp) {
              resp = resp.toJSON();
              let tempBadges = {
                'badge': resp,
              };

              // Get the points for the next level
              tempBadges.pointsForNextLevel = tempBadges
                .badge.level.pointsEndRange;
              usBadges = usBadges.concat(tempBadges);
            });
            let defaultPromises = [];
            // Check if the
            // sum of user badges + default badges of the next level of the user badges = x, the configuration
            // If not get the default badges from any category to return total x badges
            if (usBadges.length < configs[0].value) {
              defaultPromises.push(new Promise(function(resolve) {
                getDefaultBadges(resolve);
              })
              );
              Promise.all(defaultPromises)
                .then((defaultResponse) => {
                  index = 0;
                  noOfDefaultBadges = configs[0].value -
                    usBadges.length;
                  defaultResponse[0].forEach(function(resp) {
                    resp = resp.toJSON();
                    if (index < noOfDefaultBadges) {
                      let foundCat = false;
                      uBadges.forEach(function(uBadge) {
                        uBadge = uBadge.toJSON();
                        // Check if user already has a badge in this category
                        if (uBadge.badge.level.categoryId ==
                          resp.categoryId) {
                          foundCat = true;
                        }
                      });
                      // Add to the default list only if the user does not have a badge in this category
                      if (!foundCat) {
                        let tempBadges = {
                          'badge': resp,
                        };
                        usBadges = usBadges.concat(tempBadges);
                        ++index;
                      }
                    }
                  });
                  cb(null, usBadges);
                });
            } else {
              cb(null, usBadges);
            }
          });
      } else {
        cb(null, uBadges);
      }
    });
  };

  /**
  * This method is used to get the badges for the next level in a category.
  * The next level is identified using the sequence of the level.
  */
  var getNextLevelBadges = function(nextLevelSequence,
    categoryId, configs, resolve) {
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
        limit: configs[0].value,
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
    UserBadge.find({
      where: {
        userId: userIdValue,
      },
      include: [
        {
          user: ['scores'],
        },
        {
          badge: {
            level: ['category'],
          },
        }],
    }, function(err, userBadges) {
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
          })
          );
          Promise.all(catPromises)
            .then((response) => {
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
                      getNextLevelsInCategories(score,
                        category.id, resolve);
                    }));
                  }
                }
              });
              Promise.all(promises)
                .then((response) => {
                  console.log(response);
                  cb(null, response);
                });
            });
        } else {
          Promise.all(promises)
            .then((response) => {
              console.log(response);
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
