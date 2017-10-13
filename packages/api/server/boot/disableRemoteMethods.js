module.exports = function(app) {
	
	var Event = app.models.Event;
	var Initiative = app.models.Initiative;
	var User = app.models.user;


	User.disableRemoteMethodByName("replaceOrCreate");
	User.disableRemoteMethodByName("patchOrCreate");
	User.disableRemoteMethodByName("findOne");
	User.disableRemoteMethodByName("destroyById");
	User.disableRemoteMethodByName("count");
	User.disableRemoteMethodByName("replaceById");
	User.disableRemoteMethodByName("prototype.patchAttributes");
	User.disableRemoteMethodByName("createChangeStream");
	User.disableRemoteMethodByName("updateAll");
	User.disableRemoteMethodByName("replaceOrCreate");
	User.disableRemoteMethodByName("replaceById");
	
	User.disableRemoteMethodByName('prototype.__count__accessTokens');
	User.disableRemoteMethodByName('prototype.__create__accessTokens');
	User.disableRemoteMethodByName('prototype.__delete__accessTokens');
	User.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
	User.disableRemoteMethodByName('prototype.__findById__accessTokens');
	User.disableRemoteMethodByName('prototype.__get__accessTokens');
	User.disableRemoteMethodByName('prototype.__updateById__accessTokens');

	User.disableRemoteMethodByName('prototype.__create__enrollments');
	User.disableRemoteMethodByName('prototype.__delete__enrollments');
	User.disableRemoteMethodByName('prototype.__destroyById__enrollments');
	
	User.disableRemoteMethodByName('prototype.__count__tasks');
	User.disableRemoteMethodByName('prototype.__create__tasks');
	User.disableRemoteMethodByName('prototype.__delete__tasks');
	User.disableRemoteMethodByName('prototype.__destroyById__tasks');
	User.disableRemoteMethodByName('prototype.__findById__tasks');
	User.disableRemoteMethodByName('prototype.__get__tasks');
	User.disableRemoteMethodByName('prototype.__updateById__tasks');
	
	Event.disableRemoteMethodByName("replaceOrCreate");
	Event.disableRemoteMethodByName("patchOrCreate");
	Event.disableRemoteMethodByName("findOne");
	Event.disableRemoteMethodByName("destroyById");
	Event.disableRemoteMethodByName("count");
	Event.disableRemoteMethodByName("replaceById");
	Event.disableRemoteMethodByName("prototype.patchAttributes");
	Event.disableRemoteMethodByName("createChangeStream");
	Event.disableRemoteMethodByName("updateAll");
	Event.disableRemoteMethodByName("replaceOrCreate");
	Event.disableRemoteMethodByName("replaceById");

	Initiative.disableRemoteMethodByName("replaceOrCreate");
	Initiative.disableRemoteMethodByName("patchOrCreate");
	Initiative.disableRemoteMethodByName("findOne");
	Initiative.disableRemoteMethodByName("destroyById");
	Initiative.disableRemoteMethodByName("count");
	Initiative.disableRemoteMethodByName("replaceById");
	Initiative.disableRemoteMethodByName("prototype.patchAttributes");
	Initiative.disableRemoteMethodByName("createChangeStream");
	Initiative.disableRemoteMethodByName("updateAll");
	Initiative.disableRemoteMethodByName("replaceOrCreate");
	Initiative.disableRemoteMethodByName("replaceById");
	
};

