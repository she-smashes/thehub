'use strict';

module.exports = function (User) {


	User.listTasks = function (userId, cb) {

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
			{ arg: 'userId', type: 'string' }
		],
		returns: { arg: 'tasks', type: 'array' },
		http: { path: '/list-tasks', verb: 'get' }

	});

	User.listEnrollments = function (userId, cb) {

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
			{ arg: 'userId', type: 'number' }
		],
		returns: { arg: 'enrollments', type: 'array' },
		http: { path: '/list-enrollments', verb: 'get' }

	});

	User.afterRemote('login', function (context, modelInstance, next) {

		let accessToken = "";
		if (context && context.result.id != undefined) {
			accessToken = context.result;
		}

		let permissions = getPermissibleActions(User, accessToken);

		Promise.resolve(permissions)
			.then((results) => {
				let permissionObj = [];
				results.forEach(function (result) {

					if (result.isAllowed.permission === 'ALLOW') {
						permissionObj.push(result.isAllowed.model + "_" + result.isAllowed.property);
					}
				});
				context.result.allowedActionList = permissionObj;
			})
			.then(() => {
				console.log('context.result', context.result.userId);

				if (context && context.result && context.result.userId != undefined) {

					User.find({
						where: {
							id: context.result.userId
						}
					}, function (err, userInstance) {

						if (userInstance) {
							Object.assign(context.result, userInstance[0]);
						}
						next();
					});
				} else {
					next();
				}






			});
	});
};

function getPermissibleActions(user, accessToken) {
	let modelNames = [
		'user',
		'event',
		'initiative'
	];

	let readProperties = [
		'findOne',
		'find',
		'findById',
		'count',
		'exists'
	];


	let writeProperties = [
		'create',
		'upsert',
		'deleteById',
		'updateAll',
		'updateAttributes',
		'patchAttributes',
		'createChangeStream',
		'replace',
		'replaceById',
		'upsertWithWhere',
		'replaceOrCreate'
	];

	let promises = [];
	let allProperties = [];
	allProperties = readProperties.concat(writeProperties);
	//allProperties = ['create'];
	//modelNames = ['event'];
	modelNames.forEach(function (modelName) {
		allProperties.forEach(function (property) {

			let accessType = "";
			if (writeProperties.indexOf(property) >= 0) {
				accessType = "WRITE";
			} else {
				accessType = "READ";
			}

			let context = {
				accessToken: accessToken,
				model: modelName,
				property: property,
				accessType: accessType
			}

			let accessTokenResult = user.app.models.ACL.checkAccessForContext(context)
				.then((result) => {
					return {
						isAllowed: result,
						modelName: modelName,
						methodName: property
					};
				});
			promises.push(accessTokenResult);
		});
	});
	return Promise.all(promises);
}