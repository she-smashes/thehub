'use strict';

module.exports = function(Task) {
  Task.disableRemoteMethodByName('upsert');
  Task.disableRemoteMethodByName('upsertWithWhere');
  Task.disableRemoteMethodByName('exists');
  Task.disableRemoteMethodByName('updateAll');
  Task.disableRemoteMethodByName('createChangeStream');
  Task.disableRemoteMethodByName('replaceById');
  Task.disableRemoteMethodByName('replaceOrCreate');

  /**
  * This remote method is to list all the pending tasks for the user.
  */
  Task.listPendingTasks = function(ctx, cb) {
    Task.find({
      where: {
        status: 'Pending',
      },
    }, function(err, taskInstanses) {
      cb(null, taskInstanses);
    });
  };

  /**
  * This remote method is to list all the pending tasks for the user.
  */
  Task.remoteMethod('listPendingTasks', {
    accepts: [
      {arg: 'ctx', type: 'object', http: {source: 'context'}},
    ],
    http: {
      path: '/list-pending-tasks',
      verb: 'get',
    },
    returns: {
      arg: 'pendingTasks',
      type: 'array',
    },
  });

  /**
  * This method returns the approvable associated with the task.
  */
  var getApprovableForTask = function(task, resolve) {
    let Model = Task.app.models[task.type];
    Model.find({
      where: {
        id: task.approvableId,
      },
    }, function(err, approvable) {
      task.approvable = approvable[0];
      resolve();
    });
  };

  /**
  * This method returns the list of approvables associated with the parent entity of the task.
  */
  var getApprovableForGroupTask = function(task, resolve) {
    let Model = Task.app.models[task.parentType];
    Model.find({
      where: {
        id: task.parentTypeId,
      },
    }, function(err, approvable) {
      task.approvable = approvable[0];
      resolve();
    });
  };

  /**
  * This method is used to append the approvable data to the task info.
  * This is before returning the result.
  * This happens after the remote method executes.
  */
  Task.afterRemote('listPendingTasks', function(context, modelInstance, next) {
    let approvables = [];
    const promises = [];
    context.result.pendingTasks.forEach(function(task) {
      // Check if the task is a single approvable
      // or
      // if it has a list of approvables under it.
      if (task.parentType !== '' && task.parentType !== undefined) {
        promises.push(new Promise(function(resolve) {
          getApprovableForGroupTask(task, resolve);
        })
        );
      } else {
        promises.push(new Promise(function(resolve) {
          getApprovableForTask(task, resolve);
        })
        );
      }
    });
    Promise.all(promises)
      .then((response) => {
        next();
      });
  });

  /**
  * This hook method is used to change the status of the approvables.
  * This happens after the task status is changed.
  */
  Task.observe('after save', function(ctx, next) {
    if (ctx.instance && !ctx.isNewInstance) {
      let Model = Task.app.models[ctx.instance.type];
      if (ctx.instance.status === 'approved') {
        if (ctx.instance.parentType !== undefined) {
          const promises = [];
          ctx.instance.approvableIds.forEach(function(approvableId) {
            // Find the approvables based on the ids in the task
            promises.push(new Promise(function(resolve) {
              Model.find(
                {where: {id: approvableId}}, function(err, approvable) {
                  resolve(approvable);
                });
            }));
          });
          Promise.all(promises)
            .then((response) => {
              const updatePromises = [];
              response.forEach(function(resp) {
                updatePromises.push(new Promise(function(resolve2) {
                  // Update the status of the group of approvables in the task
                  resp[0].updateAttributes({
                    status: ctx.instance.status,
                  }, function(err, approvble) {
                    resolve2(approvble);
                  });
                }));
              });
              Promise.all(updatePromises).then((updateResponse) => {
                next();
              });
            });
        } else {
          // Update the status of the single approvable in the task
          Model.updateAll({id: ctx.instance.approvableId},
            {status: ctx.instance.status}, function(err, results) {
              next();
            });
        }
      } else {
        next();
      }
    } else {
      next();
    }
  });
};

