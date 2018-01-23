'use strict';

module.exports = function(Event) {
  Event.disableRemoteMethodByName('upsert');
  Event.disableRemoteMethodByName('upsertWithWhere');
  Event.disableRemoteMethodByName('exists');
  Event.disableRemoteMethodByName('updateAll');
  Event.disableRemoteMethodByName('count');
  Event.disableRemoteMethodByName('createChangeStream');
  Event.disableRemoteMethodByName('replaceById');
  Event.disableRemoteMethodByName('replaceOrCreate');

  /**
  * This remote method is to list all the 'z' events
  * where z = x + y ,
  * where x = x no of events that has start date < current date
  * where y = y no of events that has start date > current date
  * and status = approved.
  */
  Event.listEvents = function(ctx, cb) {
    let configs = ctx.req.configs;
    Event.find({
      where: {
        startDate: {lt: Date.now()},
        status: 'approved',
      },
      order: 'startDate ASC',
      limit: configs[0].value,
    }, function(err, pastInstances) {
      Event.find({
        where: {
          startDate: {gte: Date.now()},
          status: 'approved',
        },
        order: 'startDate ASC',
        limit: configs[1].value,
      }, function(err, futureInstances) {
        let instances = [];
        instances = pastInstances.concat(futureInstances);

        cb(null, instances);
      });
    });
  };

  /**
  * This method is used to get the configuration values
  * - no_of_past_events
  * - no_of_future_events
  * This happens before the remote method executes.
  */
  Event.beforeRemote('listEvents', function(context, unused, next) {
    Event.app.models.config.find({
      where: {
        or:
        [
          {name: 'no_of_past_events'},
          {name: 'no_of_future_events'},
        ],
      },
    },
      function(err, configs) {
        context.req.configs = configs;
        next();
      });
  });

  /**
  * This remote method is to list all the 'z' events
  * where z = x + y ,
  * where x = x no of events that has start date < current date
  * where y = y no of events that has start date > current date
  * and status = approved.
  */
  Event.remoteMethod('listEvents', {
    accepts: [
      {arg: 'ctx', type: 'object', http: {source: 'context'}},
    ],
    http: {
      path: '/list-events',
      verb: 'get',
    },
    returns: {
      arg: 'events',
      type: 'array',
    },
  }
  );

  /**
  * This remote method is to list
  * the events that are approved and
  * the events that are unapproved for the current user in context
  */
  Event.listEventsForUser = function(ctx, userId, cb) {
    var userIdValue = ctx.req.accessToken.userId;

    Event.find({
      where: {
        endDate: {gte: Date.now()},
        status: 'approved',
      },
      order: 'startDate ASC',
    }, function(err, pastInstances) {
      // this logic is to determin the list of non-approved events that are returned
      // by this query. userIdValue = 0 for an admin user and all non-approved events are returned
      if (userIdValue == 0) {
        Event.find({
          where: {
            endDate: {gte: Date.now()},
            status: 'not approved',
          },
          order: 'startDate ASC',
        }, function(err, futureInstances) {
          let instances = [];
          instances = pastInstances.concat(futureInstances);

          cb(null, instances);
        });
      } else {
        Event.find({
          where: {
            endDate: {gte: Date.now()},
            status: 'not approved',
            createdBy: userIdValue,
          },
          order: 'startDate ASC',
        }, function(err, futureInstances) {
          let instances = [];
          instances = pastInstances.concat(futureInstances);

          cb(null, instances);
        });
      }
    });
  };

  /**
  * This remote method is to list
  * the events that are approved and
  * the events that are unapproved for the current user in context
  */
  Event.remoteMethod('listEventsForUser', {
    accepts: [
      {arg: 'ctx', type: 'object', http: {source: 'context'}},
      {arg: 'userIdValue', type: 'number'},
    ],
    http: {
      path: '/list-events-for-user',
      verb: 'get',
    },
    returns: {
      arg: 'events',
      type: 'array',
    },
  });

  /**
  * This hook method is to preset the status of the event as not approved
  * This happens while creating an event.
  */
  Event.observe('before save', function(ctx, next) {
    if (ctx.instance) {
      ctx.instance.status = 'not approved';
    }
    next();
  });
  /**
  * This hook method is
  * - to associate the event and the list of available participants (roles) in it
  * in the eventParticipant table.
  * - to create a task for approval
  * This happens after creating an event.
  */
  Event.observe('after save', function(ctx, next) {
    if (ctx.instance) {
      // Get the list of participants of the event
      ctx.instance.participantId.forEach(pId => {
        ctx.instance.participants.add(pId);
      });
      // Create a task for approval
      Event.app.models.Task.create({
        type: 'event',
        approvableId: ctx.instance.id, status: 'Pending',
      });
    } else {
      // do nothing
    }
    next();
  });

  /**
  * This method is to calculate the points for an enrollment.
  * Formula:
  * Hourly Event: Event Hours * 10 * Type Of Participant
  * Non-Hourly Event: 10 * Type Of Participant
  */
  let getPointsForEnrollment = function(enrollment, eventHours) {
    let totalPoints = 0;
    if (enrollment.participantsList[0].hourly) {
      totalPoints = eventHours * 10 *
        enrollment.participantsList[0].noOfPoints;
    } else {
      totalPoints = 10 * enrollment.participantsList[0].noOfPoints;
    }
    return totalPoints;
  };

  /**
  * This method is to get the enrollments for user.
  */
  let getEnrollmentForUser = function(eventId, userId, roleId, resolve) {
    const promises = [];

    promises.push(new Promise(function(resolve) {
      // Get the Participant instance correponding to the roleId (participantId)
      Event.app.models.Participant.find({
        where: {
          'id': roleId,
        },
      }, function(err, participant) {
        resolve(participant);
      });
    }));

    Promise.all(promises)
      .then((response) => {
        // Find the enrollments for the user for the event
        Event.app.models.Enrollment.find({
          where: {
            'eventId': eventId,
            'userId': userId,
          },
        }, function(err, enrollment) {
          // If there is no enrollment instance created for the user,
          // it means the user has not registered
          // So create a dummy/new enrollment object to hold the details
          if (enrollment.length <= 0) {
            let enroll = {};
            enroll.userId = userId;
            enroll.eventId = eventId;
            enrollment = [];
            enrollment.push(enroll);
          }

          // update the participant details for dummy and existing enrollments
          enrollment[0].enrollmentType = roleId;
          enrollment[0].participantsList = response[0];
          resolve(enrollment);
        });
      });
  };

  /**
  * This remote method is to update the attendance for the event.
  */
  Event.updateAttendance = function(ctx, data, cb) {
    const promises = [];

    let eventId = data['eventId'];
    let userRoles = data['userRoles'];
    let attendanceFlag = data['attendanceFlag'];

    // Find the event details
    Event.find({
      where: {
        id: eventId,
      },
    }, function(err, eventInstance) {
      let eventHours = eventInstance[0].hours;
      // Iterate over the roles
      Object.keys(userRoles).forEach(function(roleId) {
        // Iterate over the users for each role (participant) type
        userRoles[roleId].forEach(function(userId) {
          promises.push(new Promise(function(resolve) {
            // Get the enrollment for the user
            getEnrollmentForUser(eventId, userId, roleId, resolve);
          }));
        });
      });
      Promise.all(promises)
        .then((response) => {
          if (attendanceFlag === 'submit') {
            Promise.resolve(new Promise(function(resolve1) {
              findAttendanceTask(eventId, resolve1);
            })).then((task) => {
              if (task !== undefined && task.length > 0) {
                processEnrollments(response, eventHours, attendanceFlag, cb);
              } else {
                Promise.resolve(new Promise(function(resolve2) {
                  createAttendanceTask(eventId, resolve2);
                })).then((task) => {
                  processEnrollments(response, eventHours, attendanceFlag, cb);
                });
              }
            });
          } else {
            processEnrollments(response, eventHours, attendanceFlag, cb);
          }
        });
    });
  };

  var findAttendanceTask = function(eventId, resolve) {
    Event.app.models.Task.find({
      where: {
        parentType: 'event',
        parentTypeId: eventId,
        type: 'enrollment',
      },
    }, function(err, task) {
      resolve(task);
    });
  };

  var createAttendanceTask = function(eventId, resolve) {
    Event.app.models.Task.create({
      type: 'enrollment',
      status: 'Pending',
      approvableIds: [],
      parentType: 'event',
      parentTypeId: eventId,
    }, function(err, newTaskInstance) {
      resolve(newTaskInstance);
    });
  };

  var processEnrollments = function(response, eventHours, attendanceFlag, cb) {
    const updatePromises = [];
    response.forEach(function(enrollmnt) {
      let enrollment = enrollmnt[0];
      // calculate the total points for each enrollment
      let totalPoints = getPointsForEnrollment(enrollment, eventHours);
      if (enrollment.id != undefined) {
        updatePromises.push(new Promise(function(resolve) {
          // Update the Enrollment instance with
          // - attendance details (save/submit)
          // - enrollment type
          // - total points for this enrollment
          enrollment.updateAttributes({
            'enrollmentType': enrollment.enrollmentType,
            'attendanceFlag': attendanceFlag,
            'points': totalPoints,
          }, function(err, result) {
            resolve(result);
          });
        }));
      } else {
        updatePromises.push(new Promise(function(resolve) {
          // Create an enrollment instance with
          // - eventId
          // - userId
          // - attendance details (save/submit)
          // - enrollment type
          // - total points for this enrollment
          Event.app.models.enrollment.create({
            'eventId': enrollment.eventId,
            'userId': enrollment.userId,
            'enrollmentType': enrollment.enrollmentType,
            'attendanceFlag': attendanceFlag,
            'points': totalPoints,
          }, function(err, result) {
            resolve(result);
          });
        }));
      }
    });
    Promise.all(updatePromises)
      .then((response) => {
        cb();
      });
  };
  /**
  * This remote method is to update the attendance for the event.
  */
  Event.remoteMethod('updateAttendance', {
    accepts: [
      {
        arg: 'ctx',
        type: 'object',
        http: {source: 'context'},
      },
      {
        arg: 'data',
        type: 'object',
        http: {source: 'body'},
      },
    ],
    http: {
      path: '/update-attendance',
      verb: 'post',
    },
  }
  );
};
