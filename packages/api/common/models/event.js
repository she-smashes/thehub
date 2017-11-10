'use strict';

module.exports = function (Event) {

  Event.listEvents = function (cb) {
    Event.find({
      where: {
        startDate: { lt: Date.now() }
      },
      order: 'startDate DESC',
      limit: 5
    }, function (err, pastInstances) {
      Event.find({
        where: {
          startDate: { gte: Date.now() }
        },
        order: 'startDate DESC',
        limit: 5
      }, function (err, futureInstances) {

        let instances = [];
        instances = pastInstances.concat(futureInstances);

        cb(null, instances);
      });

    });
  };
  Event.remoteMethod('listEvents', {
    http: {
      path: '/list-events',
      verb: 'get'
    },
    returns: {
      arg: 'events',
      type: 'array'
    }
  }
  );
}
