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
