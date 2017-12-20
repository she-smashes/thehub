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
  * This hook method is to
  * - calculate the score for the user once the enrollment is approved
  * - create/update a task once an enrollment is submitted
  */
  Enrollment.observe('after save', function(ctx, next) {
    if (ctx.instance && ctx.instance.status === 'approved') {
      console.log('Approved Enrollment %s matching %j',
        ctx.Model.pluralModelName,
        ctx.where);
      Promise.resolve(new Promise(function(resolve) {
        // Find the event details
        Enrollment.app.models.Event.find({
          where: {
            id: ctx.instance.eventId,
          },
        }, function(err, events) {
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
                // If a score already exists for the user for this event category,
                // then sum the enrollment points with the existing score
                score.updateAttributes({
                  points: score.points + ctx.instance.points,
                });
              } else {
                // If new score for the user for this event category,
                // then assign sum the enrollment points
                Enrollment.app.models.Score.create({
                  userId: ctx.instance.userId,
                  categoryId: event.categoryId, points: ctx.instance.points,
                });
              }
              resolve1(score);
            });
          }));
          resolve(event);
        });
      }));
    } else if (ctx.instance && ctx.instance.attendanceFlag === 'submit') {
      // Get the task
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
        } else {
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
