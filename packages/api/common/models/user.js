'use strict';

module.exports = function(User) {

	
	User.listTasks = function(userId, cb) {
		
		User.find({
			"filter": {
				"where": {
					"id": userId
				},
				"include": {
					"relation": "tasks"
				}
			}
		});
		
    };
	User.remoteMethod('listTasks', {
		
		accepts: [
		  {arg: 'userId', type: 'string'}
		],
		returns: {arg: 'tasks', type: 'array'},
		http: {path:'/list-tasks', verb: 'get'}
		
	});

	User.listEnrollments = function(userId, cb) {
    	
		User.find({
			"filter": {
				"where": {
				  "id": userId
				},
				"include": {
				  "relation": "enrollments"
				}
			}
		});
	
	};
	User.remoteMethod('listEnrollments', {
		
		accepts: [
		  {arg: 'userId', type: 'number'}
		],
		returns: {arg: 'enrollments', type: 'array'},
		http: {path:'/list-enrollments', verb: 'get'}
		
	});
	
	User.afterRemote ('login', function (context, modelInstance, next) {  

	let accessToken = "";
	if(context && context.req.accessToken != undefined) {
		accessToken = context.req.accessToken;
	}
		let permissions = getPermissibleActions(User, accessToken);
		
		Promise.resolve(permissions)
		.then((results)=>{
			let permissionObj = [];
			results.forEach(function (result) {
				if(result.isAllowed) {
					permissionObj.push(result.modelName + "_" + result.methodName);
				}
			});
			context.result.allowedActionList = permissionObj;
		})
		.then(()=>{
			next();
		});
	}); 
};

function getPermissibleActions(user, accessToken) {
	const modelNames = [
        'user',
        'event',
        'initiative'
    ];
	
	const methodNames = [
        'create',
        'upsert',
        'deleteById',
        'updateAll',
        'updateAttributes',
        'patchAttributes',
        'createChangeStream',
        'findOne',
        'find',
        'findById',
        'count',
        'exists',
        'replace',
        'replaceById',
        'upsertWithWhere',
        'replaceOrCreate'
    ];

	let promises = [];
	  
	modelNames.forEach(function (modelName) {
		methodNames.forEach(function (methodName) {
			let accessTokenResult = user.app.models.ACL.checkAccessForToken({id:accessToken}, modelName, '', methodName )
				.then((result)=>{
					return {
						isAllowed: result,
						modelName: modelName,
						methodName: methodName
					}; 
				});
			promises.push(accessTokenResult);
		});
	});
	return Promise.all(promises);
}