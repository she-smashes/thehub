'use strict';

module.exports = function (Task) {
    Task.listPendingTasks= function (ctx, cb) {

        Task.find({
            where: {
                status: 'Pending'
            }
        }, function (err, taskInstanses) {
            cb(null, taskInstanses);
        });
    };


  Task.remoteMethod('listPendingTasks', {
    accepts: [
      { arg: 'ctx', type: 'object', http: { source: 'context' }}
    ],
    http: {
      path: '/list-pending-tasks',
      verb: 'get'
    },
    returns: {
      arg: 'pendingTasks',
      type: 'array'
    }
  }
  );
};
