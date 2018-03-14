'use strict';

module.exports = function(Participant) {
  Participant.disableRemoteMethodByName('replaceOrCreate');
  Participant.disableRemoteMethodByName('patchOrCreate');
  Participant.disableRemoteMethodByName('destroyById');
  Participant.disableRemoteMethodByName('count');
  Participant.disableRemoteMethodByName('exists');
  Participant.disableRemoteMethodByName('replaceById');
  Participant.disableRemoteMethodByName('prototype.patchAttributes');
  Participant.disableRemoteMethodByName('createChangeStream');
  Participant.disableRemoteMethodByName('replaceOrCreate');
  Participant.disableRemoteMethodByName('replaceById');
  Participant.disableRemoteMethodByName('upsertWithWhere');
  Participant.disableRemoteMethodByName('updateAll');
  Participant.disableRemoteMethodByName('create');
};
