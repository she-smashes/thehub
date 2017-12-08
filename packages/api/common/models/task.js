'use strict';

module.exports = function(Task) {
  Task.disableRemoteMethodByName('upsert');
  Task.disableRemoteMethodByName('upsertWithWhere');
  Task.disableRemoteMethodByName('exists');
  Task.disableRemoteMethodByName('updateAll');
  Task.disableRemoteMethodByName('createChangeStream');
  Task.disableRemoteMethodByName('replaceById');
  Task.disableRemoteMethodByName('replaceOrCreate');

  Task.listPendingTasks = function(ctx, cb) {
    Task.find({
      where: {
        status: 'Pending',
      },
    }, function(err, taskInstanses) {
      cb(null, taskInstanses);
    });
  };

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

  Task.afterRemote('listPendingTasks', function(context, modelInstance, next) {
    let approvables = [];
    const promises = [];
    let taskMap = {};

    let arr = context.result.pendingTasks;
    arr.forEach(function(task, idx, array) {
      let Model = Task.app.models[task.type];
      Promise.resolve(Model.find({
        where: {
          id: task.approvableId,
        },
      }, function(err, approvable) {
        console.log(approvable);
        task.approvable = approvable[0];
        if (idx === array.length - 1) {
          next();
        }
      }));
    });
  });
  Task.observe('after save', function(ctx, next) {
    if (ctx.instance) {
      let Model = Task.app.models[ctx.instance.type];
      if (ctx.instance.status === 'approved') {
        Model.updateAll({id: ctx.instance.approvableId},
          {status: ctx.instance.status}, function(err, results) {
            next();
          });
      }
    }
  });
};
