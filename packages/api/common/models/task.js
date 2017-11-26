'use strict';

module.exports = function (Task) {

  Task.disableRemoteMethodByName('upsert');
  Task.disableRemoteMethodByName('upsertWithWhere');
  Task.disableRemoteMethodByName('exists');
  Task.disableRemoteMethodByName('updateAll');
  Task.disableRemoteMethodByName('createChangeStream');
  Task.disableRemoteMethodByName('replaceById');
  Task.disableRemoteMethodByName('replaceOrCreate');

  Task.listPendingTasks = function (ctx, cb) {

    Task.find({
      where: {
        status: 'Pending'
      }
    }, function (err, taskInstanses) {

      console.log(taskInstanses);
      cb(null, taskInstanses);
    });
  };


  Task.remoteMethod('listPendingTasks', {
    accepts: [
      { arg: 'ctx', type: 'object', http: { source: 'context' } }
    ],
    http: {
      path: '/list-pending-tasks',
      verb: 'get'
    },
    returns: {
      arg: 'pendingTasks',
      type: 'array'
    }
  });

  Task.afterRemote('listPendingTasks', function (context, modelInstance, next) {

    let approvables = [];
    const promises = [];
    let taskMap = {};
    context.result.pendingTasks.forEach(function (task) {
      taskMap[task.id] = task;
      let Model = Task.app.models[task.type];
      promises.push(Promise.resolve(Model.find({
        where: {
          id: task.approvableId
        }
      }, function (err,approvable) {
        task.approvable = approvable[0];
      })));
    });

    Promise.all(promises.map(p => p.catch(() => undefined)))
      .then((response) => {
        next();
      });
  });
};
