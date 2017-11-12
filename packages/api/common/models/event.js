'use strict';

module.exports = function (Event) {

  Event.listEvents = function (ctx, cb) {
    let configs = ctx.req.configs;
    Event.find({
      where: {
        startDate: { lt: Date.now() }
      },
      order: 'startDate DESC',
      limit: configs[0].value
    }, function (err, pastInstances) {
      
      Event.find({
        where: {
          startDate: { gte: Date.now() }
        },
        order: 'startDate DESC',
        limit: configs[1].value
      }, function (err, futureInstances) {

        let instances = [];
        instances = pastInstances.concat(futureInstances);

        cb(null, instances);
      });

    });
  };

  Event.beforeRemote('listEvents', function (context, unused, next) {

    Event.app.models.config.find({
      where: {
        or:
        [
          { name: 'no_of_past_events' },
          { name: 'no_of_future_events' }
        ]
      }
    },
      function (err, configs) {
        context.req.configs = configs;
        next();
      });
  });

  Event.remoteMethod('listEvents', {
    accepts: [
      { arg: 'ctx', type: 'object', http: { source: 'context' }}
    ],
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
