'use strict';

module.exports = function(UserBadge) {
  /**
   * If invoked from List User Badges,
   * This method is used to find x badges to be shown for the user.
   * The x is the sum of user badges + default badges if required.
   *
   * If invoked from List SystemBadges,
   * This method just returns all the user badges without any limit.
   *getBadgesForUser
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
  * The x is the configurable no of user badges to be returned.
  */
  UserBadge.listUserBadges = function(ctx, cb) {
    // Find the list of user badges with the user, score, level and category details.
    // Limit the result set to the configured x
    Promise.resolve(new Promise(function(resolve) {
      getBadgesForUser(ctx, resolve, true);
    })).then((userBadges) => {
      cb(null, userBadges);
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
            // To return only main categories
            if (resp.level.category.type === '') {
              userBadges.forEach(function(uBadge) {
                uBadge = uBadge.toJSON();

                // Check if the user allready has this badge in the system badge list
                if ((uBadge.badge.id + '') === (resp.id + '')) {
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
            }
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

        Promise.all(promises).then((response) => {
          Promise.resolve(new Promise(function(resolve) {
            getBadgesForUser(ctx, resolve, false);
          })).then((userBadges) => {
            // Group the badges by category before returning
            console.log(userBadges);
            let tempBadges = [];
            userBadges.forEach(function(uBadge) {
              uBadge = uBadge.toJSON();
              tempBadges = tempBadges.concat(uBadge);
            });
            let categoryGroup = groupByCategory(tempBadges);
            let respp = {};
            respp.userCategories = response;
            respp.userBadges = categoryGroup;

            cb(null, respp);
          });

          // cb(null, response);
        });
      } else {
        cb(null);
      }
    });
  };
  /**
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
      arg: 'userProgressInfo',
      type: 'object',
    },
  });

  /**
    * This remote method returns the list of all badges that can be claimed by the user.
    */
  UserBadge.listBadgesToBeClaimed = function(ctx, cb) {
    UserBadge.find({
      where: {
        userId: ctx.req.accessToken.userId,
        claimed: false,
      },
      include: [{
        user: ['scores'],
      }, {
        badge: {
          level: ['category'],
        },
      }],
    }, function(err, userBadges) {
      cb(null, userBadges);
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
