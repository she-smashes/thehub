'use strict';

const sampleData = require('./create-user-list.json');

module.exports = function (app, cb) {

  const employeePromises = [];
  const appadminPromises = [];
  const sysadminPromises = [];

	Object.keys(sampleData).forEach(modelName => {
		const Model = app.models[modelName];
		const modelItems = sampleData[modelName];

		modelItems.forEach(modelItem => {
			if(modelItem.role === 'employee') {
				 employeePromises.push(new Promise(resolve => {
					Model.upsertWithWhere({ 'email': modelItem.email }, modelItem).then(resolve);
				}))
			} else if(modelItem.role === 'appadmin') {
				 appadminPromises.push(new Promise(resolve => {
					Model.upsertWithWhere({ 'email': modelItem.email }, modelItem).then(resolve);
				}))
			} else if(modelItem.role === 'sysadmin') {
				 sysadminPromises.push(new Promise(resolve => {
					Model.upsertWithWhere({ 'email': modelItem.email }, modelItem).then(resolve);
				}))
			}
			delete modelItem.role;
		})
	});
  
	handleRoleMapping(app, employeePromises, 'employee');
	handleRoleMapping(app, appadminPromises, 'appadmin');
	handleRoleMapping(app, sysadminPromises, 'sysadmin');

	console.log('Sample users, roles and their mapping set up successfully');
};

function handleRoleMapping(app, promises, roleName) {
	var role;
	
	app.models.Role.findOne({where: {name: roleName}}, function(err, adminRole) {
		if(adminRole) {
		  role = adminRole;
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