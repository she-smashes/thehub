'use strict';

module.exports = function (Initiative) {

  Initiative.listInitiatives = function (cb) {
    Initiative.find({}, cb);
  };
  Initiative.remoteMethod('listInitiatives', {
    returns: { arg: 'initiatives', type: 'array' },
    http: { path: '/list-initiatives', verb: 'get' }
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
      Initiative.app.models.Task.create({type: 'initiative', approvableId:ctx.instance.id, status: 'Pending'});
    } else {
      console.log('Updated Initiative %s matching %j',
        ctx.Model.pluralModelName,
        ctx.where);
    }
    next();
  });
};
