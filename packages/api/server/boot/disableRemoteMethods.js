'use strict';
module.exports = function(app) {
  var RoleMapping = app.models.RoleMapping;
  var User = app.models.user;

/*   User.disableRemoteMethodByName('replaceOrCreate');
  User.disableRemoteMethodByName('patchOrCreate');
  User.disableRemoteMethodByName('destroyById');
  User.disableRemoteMethodByName('count');
  User.disableRemoteMethodByName('replaceById');
  User.disableRemoteMethodByName('prototype.patchAttributes');
  User.disableRemoteMethodByName('createChangeStream');
  User.disableRemoteMethodByName('updateAll');
  User.disableRemoteMethodByName('replaceOrCreate');
  User.disableRemoteMethodByName('replaceById');
  User.disableRemoteMethodByName('upsertWithWhere');
  User.disableRemoteMethodByName('resetPassword');
  User.disableRemoteMethodByName('reset');
  User.disableRemoteMethodByName('changePassword'); */

  User.disableRemoteMethodByName('prototype.__count__accessTokens');
  User.disableRemoteMethodByName('prototype.__create__accessTokens');
  User.disableRemoteMethodByName('prototype.__delete__accessTokens');
  User.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
  User.disableRemoteMethodByName('prototype.__findById__accessTokens');
  User.disableRemoteMethodByName('prototype.__get__accessTokens');
  User.disableRemoteMethodByName('prototype.__updateById__accessTokens');
  User.disableRemoteMethodByName('prototype.__count__tasks');
  User.disableRemoteMethodByName('prototype.__updateById__tasks');

  RoleMapping.disableRemoteMethodByName('findById');
  RoleMapping.disableRemoteMethodByName('replaceOrCreate');
  RoleMapping.disableRemoteMethodByName('patchOrCreate');
  RoleMapping.disableRemoteMethodByName('findOne');
  RoleMapping.disableRemoteMethodByName('destroyById');
  RoleMapping.disableRemoteMethodByName('count');
  RoleMapping.disableRemoteMethodByName('exists');
  RoleMapping.disableRemoteMethodByName('replaceById');
  RoleMapping.disableRemoteMethodByName('prototype.patchAttributes');
  RoleMapping.disableRemoteMethodByName('createChangeStream');
  RoleMapping.disableRemoteMethodByName('replaceOrCreate');
  RoleMapping.disableRemoteMethodByName('replaceById');
  RoleMapping.disableRemoteMethodByName('upsertWithWhere');

	/* var defaultACL = app.models.RoleMapping.settings.acls;

	console.log(defaultACL); // output the defaults

	var acls = [
		{
			"accessType": "*",
			"principalType": "ROLE",
			"principalId": "$everyone",
			"permission": "DENY"
		},
		{
			"accessType": "WRITE",
			"principalType": "ROLE",
			"principalId": "sysadmin",
			"permission": "ALLOW",
			"property": "create"
		},
		{
			"principalType": "ROLE",
			"principalId": "sysadmin",
			"permission": "ALLOW",
			"property": "updateAttributes"
		}
	]

	app.models.User.settings.acls = acls;

*/
};

