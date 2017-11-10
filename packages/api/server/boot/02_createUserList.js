'use strict';

const sampleData = require('./createUserList.json');

module.exports = function (app, cb) {

	const rolePromises = {};
	const allPromises = [];

	Object.keys(sampleData).forEach(modelName => {
		const Model = app.models[modelName];
		const modelItems = sampleData[modelName];

		modelItems.forEach(modelItem => {
			if (rolePromises[modelItem.role] === undefined) {
				const promises = [];
				promises.push(Model.upsertWithWhere({ 'email': modelItem.email }, modelItem));
				rolePromises[modelItem.role] = promises;
			} else {
				rolePromises[modelItem.role].push(Model.upsertWithWhere({ 'email': modelItem.email }, modelItem));
			}

			delete modelItem.role;
		})
	});

	for (let key1 in rolePromises) {
		if (rolePromises.hasOwnProperty(key1)) {
			for (let key2 in rolePromises[key1]) {
				allPromises.push(rolePromises[key1][key2]);
			}
		}
	}

	Promise.all(allPromises.map(p => p.catch(() => undefined)))
		.then((res) => {
			console.log('Sample Users set up', res.length);
			for (let key in rolePromises) {
				if (rolePromises.hasOwnProperty(key)) {
					handleRoleMapping(app, rolePromises[key], key);
				}
			}

			console.log('Sample users, roles and their mapping set up successfully');
			cb();
		});



};

function handleRoleMapping(app, promises, roleName) {

	var role;
	app.models.Role.findOne({ where: { name: roleName } }, function (err, userRole) {
		if (userRole) {
			role = userRole;
		} else {
			console.log(err);
		}
	});

	Promise.all(promises.map(p => p.catch(() => undefined)))
		.then((res) => {
			var i = 0;
			const rolemappingpromises = [];
			var roleId = role.id;

			res.forEach(usr => {
				if (usr !== undefined) {
					rolemappingpromises.push(new Promise(resolve => {
						app.models.RoleMapping.findOne({ where: { principalType: 'USER', principalId: usr.id, roleId: role.id } }, function (err, oldprincipal) {
							if (!oldprincipal) {
								role.principals.create({
									principalType: app.models.RoleMapping.USER,
									principalId: usr.id
								}, function (err, principal) {
									console.log('RoleMapping done for user id = ', usr.id + ', username = ' + usr.username + ', role id = ' + role.id);
									if (!principal) {
										console.log(err);
									}
								});
							} else {
								console.log('RoleMapping exists for user id = ', usr.id + ', role id = ' + role.id);
							}
						})

					}))
				}
			});

		});
}