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

  Event.observe('before save', function(ctx, next) {
    if (ctx.instance) {
      console.log('updating Event status');
      ctx.instance.status = 'not approved';
    }
    next();
  });
  Event.observe('after save', function(ctx, next) {
    if (ctx.instance) {
	  ctx.instance.participantId.forEach(pId => {
    ctx.instance.participants.add(pId);
  });
      console.log('Saved %s#%s',
	  ctx.Model.modelName, ctx.instance.id);
      Event.app.models.Task.create({type: 'event',
	  approvableId: ctx.instance.id, status: 'Pending'});
    } else {
      console.log('Updated Event %s matching %j',
        ctx.Model.pluralModelName,
        ctx.where);
    }
    next();
  });

  let getPointsForEnrollment = function(enrollment, eventHours) {
    let totalPoints = 0;
    if (enrollment.participantsList[0].hourly) {
      totalPoints = eventHours * 10 * enrollment.participantsList[0]. noOfPoints;
    } else {
      totalPoints = 10 * enrollment.participantsList[0]. noOfPoints;
    }
    return totalPoints;
  };

  let getEnrollmentForUser = function(eventId, userId, roleId, resolve) {

    const promises = [];

    promises.push(new Promise(function(resolve) {
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
        Event.app.models.Enrollment.find({
          where: {
            'eventId': eventId,
            'userId': userId,
          },
        }, function(err, enrollment) {
          if (enrollment.length <= 0) {
            let enroll = {};
            enroll.userId = userId;
            enroll.eventId = eventId;
            enrollment = [];
            enrollment.push(enroll);
          }
          enrollment[0].enrollmentType = roleId;
          enrollment[0].participantsList = response[0];
          resolve(enrollment);
        });
      });
  };
  Event.updateAttendance = function(ctx, userRoles, eventId, attendanceFlag, cb) {
    const promises = [];

    Event.find({
      where: {
        id: eventId,
      },
    }, function(err, eventInstance) {
      let eventHours = eventInstance[0].hours;
      Object.keys(userRoles).forEach(function(roleId) {
        userRoles[roleId].forEach(function(userId) {
          promises.push(new Promise(function(resolve) {
            getEnrollmentForUser(eventId, userId, roleId, resolve);
          }));
        });
      });
      Promise.all(promises)
      .then((response) => {
        const updatePromises = [];
        response.forEach(function(enrollmnt) {
          let enrollment = enrollmnt[0];
          let totalPoints = getPointsForEnrollment(enrollment, eventHours);
          console.log(totalPoints);
          if (enrollment.id != undefined) {
            updatePromises.push(new Promise(function(resolve) {
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
      });
    });
  };

  Event.remoteMethod('updateAttendance', {
    accepts: [
      {
        arg: 'ctx',
        type: 'object',
        http: {source: 'context'},
      },
      {
        arg: 'userRoles',
        type: 'object',
      },
      {
        arg: 'eventId',
        type: 'string',
      },
      {
        arg: 'attendanceFlag',
        type: 'string',
      },
    ],
    http: {
      path: '/update-attendance',
      verb: 'post',
    },
  }
  );
};
