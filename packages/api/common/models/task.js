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

  var getApprovableForTask = function(task, resolve) {
    let Model = Task.app.models[task.type];
    Model.find({
      where: {
        id: task.approvableId,
      },
    }, function(err, approvable) {
      task.approvable = approvable[0];
      var newObj = {};
      newObj.approvable = approvable[0];
      newObj.status = task.status;
      newObj.id = task.id;
      newObj.created = task.created;
      newObj.type = task.type;
      newObj.approvableId = task.approvableId;
      resolve(newObj);
    });
  };

  Task.afterRemote('listPendingTasks', function(context, modelInstance, next) {
    let approvables = [];
    const promises = [];
    let taskMap = modelInstance.pendingTasks;

    let requests = taskMap.map((task) => {
      return new Promise(function(resolve) {
        getApprovableForTask(task, resolve);
      });
    });
    Promise.all(requests).then(function(results) {
      context.result.pendingTasks =  results;
      next();
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
