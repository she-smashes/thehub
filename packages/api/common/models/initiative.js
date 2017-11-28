'use strict';

module.exports = function (Initiative) {

  Initiative.disableRemoteMethodByName('upsert');
  Initiative.disableRemoteMethodByName('upsertWithWhere');
  Initiative.disableRemoteMethodByName('exists');
  Initiative.disableRemoteMethodByName('updateAll');
  Initiative.disableRemoteMethodByName('count');
  Initiative.disableRemoteMethodByName('createChangeStream');
  Initiative.disableRemoteMethodByName('replaceById');
  Initiative.disableRemoteMethodByName('replaceOrCreate');
  Initiative.disableRemoteMethodByName('prototype.__findByById__events_deleteById');
  Initiative.disableRemoteMethodByName('prototype.__findById__events_updateById');
  Initiative.disableRemoteMethodByName('prototype.__findById__events_count');

  Initiative.listInitiativesForUser = function (ctx, userId, cb) {
    userId = ctx.req.accessToken.userId;

    Initiative.find({
      where: {
        status: 'approved'
      }      
    }, function (err, pastInstances) {
      // this logic is to determin the list of non-approved events that are returned 
      // by this query. userId = 0 for an admin user and all non-approved events are returned
      if (userId == 0) {
        Initiative.find({
          where: {
            status: 'not approved'
          }
        }, function (err, futureInstances) {
          let instances = [];
          instances = pastInstances.concat(futureInstances);
          cb(null, instances);
        });
      } else {
        Initiative.find({
          where: {
            status: 'not approved',
            createdBy: userId
          }
        }, function (err, futureInstances) {
          console.log('aaaaaaaaaa = ' + futureInstances);
          
          let instances = [];
          instances = pastInstances.concat(futureInstances);
          cb(null, instances);
        });
      }
    });
  };

  Initiative.remoteMethod('listInitiativesForUser', {
    accepts: [
      { arg: 'ctx', type: 'object', http: { source: 'context' } },
      { arg: 'userId', type: 'number' }
    ],
    http: {
      path: '/list-initiatives-for-user',
      verb: 'get'
    },
    returns: {
      arg: 'initiatives',
      type: 'array'
    }
  });



  Initiative.observe('before save', function (ctx, next) {
    if (ctx.instance) {
      console.log('updating initiative status');
      ctx.instance.status = 'not approved';
    }
    next();
  });
  Initiative.observe('after save', function (ctx, next) {
    if (ctx.instance) {
      console.log('Saved %s#%s', ctx.Model.modelName, ctx.instance.id);
      Initiative.app.models.Task.create({ type: 'initiative', approvableId: ctx.instance.id, status: 'Pending' });
    } else {
      console.log('Updated Initiative %s matching %j',
        ctx.Model.pluralModelName,
        ctx.where);
    }
    next();
  });
};
