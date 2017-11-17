'use strict';

module.exports = function (Event) {

  Event.listEvents = function (ctx, cb) {
    let configs = ctx.req.configs;
    Event.find({
      where: {
        startDate: { lt: Date.now() },
        status: 'approved'
      },
      order: 'startDate DESC',
      limit: configs[0].value
    }, function (err, pastInstances) {
      
      Event.find({
        where: {
          startDate: { gte: Date.now() },
          status: 'approved'
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

  Event.observe('before save', function (ctx, next) {
    if (ctx.instance) {
      console.log('updating Event status');
        ctx.instance.status = 'not approved'; 
    }
    next();
  });
  Event.observe('after save', function (ctx, next) {
    if (ctx.instance) {
      console.log('Saved %s#%s', ctx.Model.modelName, ctx.instance.id);
      Event.app.models.Task.create({eventId: ctx.instance.id, initiativeId:null, status: 'Pending', event: ctx.instance});
    } else {
      console.log('Updated Event %s matching %j',
        ctx.Model.pluralModelName,
        ctx.where);
    }
    next();
  });

}
