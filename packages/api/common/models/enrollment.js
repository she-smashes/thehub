'use strict';

module.exports = function(Enrollment) {
  /**
  * This hook method is to preset the status of the event to not approved.
  */
  Enrollment.observe('before save', function(ctx, next) {
    if (ctx.instance && ctx.isNewInstance) {
      ctx.instance.status = 'not approved';
    }
    next();
  });

  /**
  * This method returns the event details for an event id.
  */
  var getEventDetails = function(eventId, resolve) {
    Enrollment.app.models.Event.find({
      where: {
        id: eventId,
      },
    }, function(err, events) {
      resolve(events);
    });
  };

/**
 * This method submits the attendance for an event as a task for approval.
 * @param {*} ctx
 */
  function submitAttendanceTask(ctx) {
    // Get the task and add the submitted approvalIds
    Enrollment.app.models.Task.find({
      where: {
        parentType: 'event',
        parentTypeId: ctx.instance.eventId,
        type: 'enrollment',
      },
    }, function(err, task) {
      let approvableIds = [];
      if (task != undefined && task.length > 0) {
        // If enrollments are already saved
        if (task[0].approvableIds != undefined) {
          approvableIds = approvableIds.concat(task[0].approvableIds);
        }
        approvableIds.push(ctx.instance.id);
        task[0].updateAttributes({
          'approvableIds': approvableIds,
        });
      } /* else {
        // If an enrollment is submitted as part of attendance
        // which means (fresh and direct), without registration,
        // then, create a new task
        approvableIds.push(ctx.instance.id);
        Enrollment.app.models.Task.create({
          type: 'enrollment',
          status: 'Pending',
          approvableIds: approvableIds,
          parentType: 'event',
          parentTypeId: ctx.instance.eventId,
        });
      } */
    });
  }

  /**
   * This method calculates the cumulative score for the user for a category.
   * @param {*} ctx
   */
  function calculateUserScore(ctx) {
    Promise.resolve(new Promise(function(resolve) {
      // Find the event details
      getEventDetails(ctx.instance.eventId, resolve);
    })) .then((events) => {
      let event = events[0];
      Promise.resolve(new Promise(function(resolve1) {
        // Get the already existing score for the user in this category of event
        Enrollment.app.models.Score.find({
          where: {
            userId: ctx.instance.userId,
            categoryId: event.categoryId,
          },
        }, function(err, score) {
          if (score.length > 0) {
            score = score[0];
            // If a score already exists for the user for this event category,
            // then sum the enrollment points with the existing score
            score.updateAttributes({
              points: score.points + ctx.instance.points,
            }, function() {
              claimBadgeForUser(ctx,
                                resolve1,
                                event.categoryId,
                                (score.points + ctx.instance.points));
            });
          } else {
            // If new score for the user for this event category,
            // then assign sum the enrollment points
            Promise.resolve(new Promise(function(resolve2) {
              Enrollment.app.models.Score.create({
                userId: ctx.instance.userId,
                categoryId: event.categoryId,
                points: ctx.instance.points,
              }, function(err, newScore) {
                updateUserScore(ctx, newScore.id);
                claimBadgeForUser(ctx,
                                  resolve1,
                                  event.categoryId,
                                  ctx.instance.points);
              });
            }));
          }
        });
      }));
    });
  }

  var claimBadgeForUser = function(ctx, resolve1, categoryId, totalPts) {
     // Get the list of all system badges for all categories and levels
    Promise.resolve(new Promise(function(allBadgesResolve) {
      getAllBadges(allBadgesResolve);
    })).then((allBadges) => {
      // Get all the badges claimed by the user
      Promise.resolve(new Promise(function(userBadgesResolve) {
        getUserBadges(ctx, userBadgesResolve);
      })).then((userBadges) => {
        // Check if the score and the badge is of the same category
        let badgeWithScore = findBadgesMatchingScore(
                                categoryId,
                                totalPts,
                                allBadges);

        // Check if the user has already claimed the badge
        let claimBadges = badgeToBeClaimed(badgeWithScore, userBadges);
        console.log(claimBadges);
        if (null !== claimBadges) {
          const promises = [];
          claimBadges.forEach(function(clBadge) {
            promises.push(new Promise(function(resolve) {
              Enrollment.app.models.UserBadge.create({
                'badgeId': clBadge.id,
                'userId': ctx.instance.userId,
              }, function(err) {
                resolve();
              });
            }));
          });
          Promise.all(promises)
          .then((response) => {
            resolve1();
          });
        }
      });
    });
  };

  var getUserBadges = function(ctx, resolve) {
    Enrollment.app.models.UserBadge.find({
      where: {
        userId: ctx.instance.userId,
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
  };
 /**
  * This method is used find the badges that match with the score.
  */
  var findBadgesMatchingScore = function(categoryId, totalPoints, allBadges) {
    let claimBadges = [];

    allBadges.forEach(function(badge) {
      badge = badge.toJSON();

      // Check if the score and the badge is of the same category

      if ((categoryId + '') === (badge.level.categoryId + '')) {
      // Check if the score falls in the badge point range
        if (totalPoints >= badge.level.pointsEndRange) {
          claimBadges.push(badge);
        }
      }
    });
    console.log(claimBadges);
    return claimBadges;
  };

    /**
  * This method is used check if the badges that match with the score already claimed by the user.
  */
  var badgeToBeClaimed = function(badgesMatchingScore, userBadges) {
    let claimBadges = [];
    console.log('badgeMatchingScore');

    console.log(badgesMatchingScore);
    let foundUserbadge = false;
    badgesMatchingScore.forEach(function(badgeMatchingScore) {
      foundUserbadge = false;
      userBadges.forEach(function(userBadge) {
        userBadge = userBadge.toJSON();
        if ((userBadge.badge.id + '') === (badgeMatchingScore.id + '')) {
          foundUserbadge = true;
        }
      });
         // Return the badge only if not already claimed by the user
      if (!foundUserbadge) {
        claimBadges.push(badgeMatchingScore);
      }
    });

    return claimBadges;
  };
  /**
  * This method returns the list of all system badges for all the categories.
  */
  var getAllBadges = function(resolve) {
    Enrollment.app.models['Badge'].find({
      include: {
        level: ['category'],
      },
    }, function(err, badges) {
      resolve(badges);
    });
  };
  /**
   * This method finds the user and relates to the score.
   *
   * @param {*} ctx
   * @param {*} scoreId
   */
  function updateUserScore(ctx, scoreId) {
    Promise.resolve(new Promise(function(resolve2) {
      let scoreArray = [];
      scoreArray.push(scoreId);
      // Find the user to relate to the score
      Enrollment.app.models.User.find({
        where: {
          id: ctx.instance.userId,
        },
      }, function(err, user) {
        // Update the score for the user
        user[0].updateAttributes({
          'scoreId': scoreArray,
        }, function(err, user) {
          resolve2(user);
        });
      });
    }));
  }

  /**
  * This hook method is to
  * - calculate the score for the user once the enrollment is approved
  * - create/update a task once an enrollment is submitted
  */
  Enrollment.observe('after save', function(ctx, next) {
    if (ctx.instance && ctx.instance.status === 'approved') {
      calculateUserScore(ctx);
    } else if (ctx.instance && ctx.instance.attendanceFlag === 'submit') {
      // submitAttendanceTask(ctx);
    } else {
      // do nothing
    }
    next();
  });
};
