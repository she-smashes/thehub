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
      Promise.resolve(new Promise(function(resolve1) {
        getUserScore(ctx, resolve1);
      })).then((catScoreMap) => {
        // Process the user badges returned
        let badgeLimit = ctx.req.configs[0].value;
        processUserBadges(userBadges, catScoreMap, badgeLimit, cb);
      });
    });
  };

  /**
   * This method processes the list of badges returned for the user.
   * If the count is less than the configured number, it adds some default badges to it.
   * @param {*} userBadges
   * @param {*} totalNoOfBadges
   * @param {*} cb
   */
  function processUserBadges(userBadges, catScoreMap, totalNoOfBadges, cb) {
    let uBadges = [];
    let usBadges = [];
    let usBadgeArr = [];

    uBadges = uBadges.concat(userBadges);
    usBadges = usBadges.concat(userBadges);
    if (uBadges.length < totalNoOfBadges) {
      // Find the no of default badges required = Total number of badges (x) - user badges
      // Limit the result set to the configured x
      let noOfDefaultBadges = totalNoOfBadges - uBadges.length;

      let catBadgeMap = {};

      uBadges.forEach(function(uBadge) {
        uBadge = uBadge.toJSON();
        if (catBadgeMap[uBadge.badge.level.categoryId] === undefined) {
          catBadgeMap[uBadge.badge.level.categoryId] = uBadge;
        } else {
          if (catBadgeMap[uBadge.badge.level.categoryId].badge.level.sequence <
             uBadge.badge.level.sequence) {
            catBadgeMap[uBadge.badge.level.categoryId] = uBadge;
          }
        }
      });

      const promises = [];
      // Iterate over the userbadges
      Object.keys(catBadgeMap).forEach(function(catId) {
        let uBadge = catBadgeMap[catId];
          // This is a limitation in loopback where relation properties.
          // They have to be converted using .toJSON() method
        // uBadge = uBadge.toJSON();
        promises.push(new Promise(function(resolve) {
            // Get the badges for the next level in the same badge category
          getNextLevelBadges(parseInt(uBadge.badge.level.sequence) + 1,
              uBadge.badge.level.categoryId, resolve);
        }));
      });

      Promise.all(promises).then((response) => {
        let index = 0;
        response.forEach(function(resp) {
          let tempBadges = {
            'badge': resp,
          };
          let tBadge = tempBadges.badge.toJSON();
          let nextPoints = tBadge.level.pointsEndRange;
          if (catScoreMap[tBadge.level.categoryId] !== undefined) {
            nextPoints = tBadge.level.pointsEndRange -
            catScoreMap[tBadge.level.categoryId];
          }
          // Get the points for the next level
          tempBadges.pointsForNextLevel = nextPoints;

          if (index < noOfDefaultBadges) {
            // usBadges = usBadges.concat(tempBadges);
            usBadges = usBadges.concat(tempBadges);
            ++index;
          }
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
            let defBadges = processDefBadges(defResponse[0],
              uBadges, noOfDefBadges, catScoreMap);
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
   * @param {*} defBadges
   * @param {*} uBadges
   * @param {*} noOfDefaultBadges
   */
  function processDefBadges(defBadges, uBadges, noOfDefBadges, catScoreMap) {
    let index = 0;
    let defaultBadges = [];
    defBadges.forEach(function(resp) {
      resp = resp.toJSON();
      if (index < noOfDefBadges) {
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
          let tBadge = tempBadges.badge.toJSON();

          let nextPoints = tBadge.level.pointsEndRange;
          if (catScoreMap[tBadge.level.categoryId] !== undefined) {
            nextPoints = tBadge.level.pointsEndRange -
            catScoreMap[tBadge.level.categoryId];
          }
          // Get the points for the next level
          tempBadges.pointsForNextLevel = nextPoints;

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

            // Push the user details into the system badge if user has obtained it.
            if (resp.userId !== undefined && resp.userId !== '') {
              tempBadges.userId = resp.userId;
              tempBadges.user = resp.user;
              delete resp.userId;
              delete resp.user;
            } else {
              /* tempBadges.pointsForNextLevel =
                tempBadges.badge.level.pointsEndRange; */
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
/**
 * This method get the scores for all categories for the user in a map
 * @param {*} ctx
 * @param {*} resolve
 */
  function getUserScore(ctx, resolve) {
    let catScoreMap = {};

    UserBadge.app.models.Score.find({
      where: {
        userId: ctx.req.accessToken.userId,
      },
    }, function(err, scores) {
      if (scores.length > 0) {
        scores.forEach(function(score) {
          // Add points to a map with category as the key
          catScoreMap[score.categoryId] = score.points;
        });
      }
      resolve(catScoreMap);
    });
  }

  /**
  * This method is used find the badges that match with the score.
  */
  var badgesMatchingScore = function(userScores, allBadges) {
    let claimBadges = [];
    userScores.forEach(function(score) {
      allBadges.forEach(function(badge) {
        badge = badge.toJSON();
        // Check if the score and the badge is of the same category
        if (score.categoryId === badge.level.categoryId) {
          // Check if the score falls in the badge point range
          if (score.points > badge.level.pointsStartRange &&
            score.points <= badge.level.pointsEndRange) {
            claimBadges.push(badge);
          }
        }
      });
    });
    return claimBadges;
  };

    /**
  * This method is used check if the badges that match with the score already claimed by the user.
  */
  var badgesToBeClaimed = function(badgesMatchingScore, userBadges) {
    let claimBadges = [];
    badgesMatchingScore.forEach(function(matchBadge) {
      let foundUserbadge = false;
      userBadges.forEach(function(userBadge) {
        userBadge = userBadge.toJSON();
        if (userBadge.badge.id === matchBadge.id) {
          foundUserbadge = true;
        }
      });
      // Return the badge only if not already claimed by the user
      if (!foundUserbadge) {
        claimBadges.push(matchBadge);
      }
    });
    return claimBadges;
  };

/**
  * This remote method returns the list of all badges that can be claimed by the user.
  */
  UserBadge.listBadgesToBeClaimed = function(ctx, cb) {
    let userIdValue = ctx.req.accessToken.userId;
    // Get the list of all score objects for the user in each category
    UserBadge.app.models.score.find({
      where: {
        userId: userIdValue,
      },
      include: ['category'],
    }, function(err, userScores) {
      // Get the list of all system badges for all categories and levels
      Promise.resolve(new Promise(function(resolve) {
        getAllBadges(resolve);
      })).then((allBadges) => {
        // Get all the badges claimed by the user
        Promise.resolve(new Promise(function(resolve1) {
          getBadgesForUser(ctx, resolve1, false);
        })).then((userBadges) => {
          // Check if the score and the badge is of the same category
          let badgesMatchingScore = badgesMatchingScore(userScores, allBadges);
          // Check if the user has already claimed the badge
          let claimBadges = badgesToBeClaimed(badgesMatchingScore, userBadges);
          cb(null, claimBadges);
        });
      });
    });
  };

  /**
  * This remote method is used to get the list of all categories for the user.
  * This list includes the sum of user scored categories + default categories.
  */
  UserBadge.remoteMethod('listBadgesToBeClaimed', {
    accepts: [
      {arg: 'ctx', type: 'object', http: {source: 'context'}},
    ],
    http: {
      path: '/list-badges-to-be-claimed',
      verb: 'get',
    },
    returns: {
      arg: 'badges',
      type: 'array',
    },
  });
};
