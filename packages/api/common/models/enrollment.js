'use strict';

module.exports = function(Enrollment) {
  Enrollment.observe('before save', function(ctx, next) {
    if (ctx.instance && ctx.isNewInstance) {
      ctx.instance.status = 'not approved';
    }
    next();
  });
  Enrollment.observe('after save', function(ctx, next) {
    if (ctx.instance && ctx.instance.status === 'approved') {
      console.log('Approved Enrollment %s matching %j',
      ctx.Model.pluralModelName,
      ctx.where);
      Promise.resolve(new Promise(function(resolve) {
        Enrollment.app.models.Event.find({
          where: {
            id: ctx.instance.eventId,
          },
        }, function(err, events) {
          let event = events[0];
          Promise.resolve(new Promise(function(resolve1) {
            Enrollment.app.models.Score.find({
              where: {
                userId: ctx.instance.userId,
                categoryId: event.categoryId,
              },
            }, function(err, score) {
              if (score.length > 0) {
                score.updateAttributes({
                  points: score.points + ctx.instance.points,
                });
              } else {
                Enrollment.app.models.Score.create({userId: ctx.instance.userId,
                  categoryId: event.categoryId, points: ctx.instance.points});
              }
              resolve1(score);
            });
          }));
          resolve(event);
        });
      }));
    } else if (ctx.instance && ctx.instance.attendanceFlag === 'submit') {
      Enrollment.app.models.Task.find({
        where: {
          parentType: 'event',
          parentTypeId: ctx.instance.eventId,
          type: 'enrollment',
        },
      }, function(err, task) {
        let approvableIds = [];
        if (task != undefined && task.length > 0) {
          if (task[0].approvableIds != undefined) {
            approvableIds = approvableIds.concat(task[0].approvableIds);
          }
          approvableIds.push(ctx.instance.id);
          task[0].updateAttributes({
            'approvableIds': approvableIds,
          });
        } else {
          approvableIds.push(ctx.instance.id);
          Enrollment.app.models.Task.create({
            type: 'enrollment',
            status: 'Pending',
            approvableIds: approvableIds,
            parentType: 'event',
            parentTypeId: ctx.instance.eventId,
          });
        }
      });
    } else {
      console.log('Updated Enrollment %s matching %j',
        ctx.Model.pluralModelName,
        ctx.where);
    }
    next();
  });
};
