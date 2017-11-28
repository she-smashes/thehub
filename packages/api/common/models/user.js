'use strict';

module.exports = function (User) {

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

				let countReq = false;
				context.result.allowedActionList.map(allowedAction => {
					if (allowedAction.indexOf('task_find') >= 0) {
						countReq = true;
					}
				});
				if (countReq) {
					User.app.models.Task.count({ status: 'Pending' }, function (err, count) {
						if (count > 0) {
							context.result.notificationCount = new String(count);
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
		'initiative',
		'task'
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