'use strict';

const sampleData = require('./createUserList.json');

module.exports = function (app, cb) {

	const rolePromises = {};
 
	Object.keys(sampleData).forEach(modelName => {
		const Model = app.models[modelName];
		const modelItems = sampleData[modelName];

		modelItems.forEach(modelItem => {
			if(rolePromises[modelItem.role] === undefined) {
				const promises = [];
				promises.push(new Promise(resolve => {
					Model.upsertWithWhere({ 'email': modelItem.email }, modelItem).then(resolve);
				}));
				rolePromises[modelItem.role] = promises;
			} else {
				rolePromises[modelItem.role].push(new Promise(resolve => {
					Model.upsertWithWhere({ 'email': modelItem.email }, modelItem).then(resolve);
				}));
			}
			
			delete modelItem.role;
		})
	});
  
	for (let key in rolePromises) {
		if (rolePromises.hasOwnProperty(key)) {
			handleRoleMapping(app, rolePromises[key], key);
		}
	}

	console.log('Sample users, roles and their mapping set up successfully');
	cb();
};

function handleRoleMapping(app, promises, roleName) {

	var role;
	app.models.Role.findOne({where: {name: roleName}}, function(err, userRole) {
		if(userRole) {
		  role = userRole;
		} else {
		  console.log(err);
		}
	});

	return Promise
		    .all(promises)
		    .then((res) => {
				var i = 0;

				const rolemappingpromises = [];
				var roleId = role.id;
	
				res.forEach(usr => {
					rolemappingpromises.push(new Promise(resolve => {
						app.models.RoleMapping.findOne({where: {principalType: 'USER', principalId: usr.id, roleId: role.id}}, function(err, oldprincipal) {
						if(!oldprincipal) {
							role.principals.create({
									principalType: app.models.RoleMapping.USER,
									principalId: usr.id
								}, function(err, principal) {
									console.log('RoleMapping done for user id = ' , usr.id + ', username = ' + usr.username + ', role id = ' + role.id);
									if(!principal) {
										console.log(err);
									}
							});
						} else {
							console.log('RoleMapping exists for user id = ' , usr.id + ', role id = ' + role.id);
						} 
					})
					
					}))
				});
		
			});
}