'use strict';

const sampleData = require('./create-user-list.json');

module.exports = function (app, cb) {

  const promises = [];

  Object.keys(sampleData).forEach(modelName => {
    const Model = app.models[modelName];
    const modelItems = sampleData[modelName];

    modelItems.forEach(modelItem => {
      promises.push(new Promise(resolve => {
        Model.upsertWithWhere({ 'username': modelItem.username }, modelItem).then(resolve);
      }))
    })
  });
  var role;
	
  app.models.Role.findOne({where: {name: 'employee'}}, function(err, adminRole) {
    if(adminRole) {
      console.log('adminRole' , adminRole);
      role = adminRole;
    } else {
      console.log(err);
    }
  });

  return Promise
    .all(promises)
    .then((res) => {
		console.log('Users set up', res.length);
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
							console.log('RoleMapping done for user id = ' , usr.id + ', role id = ' + role.id);
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
	console.log('User Roles set up');
};