// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  

  User.create([
    {username: 'shesmashesadmin', email: 'shesmashesadmin@sapient.com', password: 'password', points: 0, logonid: 'shesmashesadmin'}
  ], function(err, users) {
    if (err) {
		console.log('shesmashesadmin user already exists');
	}
	else {
			console.log('Created users:', users);
	}

    
	
    //create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) {
		console.log('admin role already exists');
	} else {

      console.log('Created role:', role);
	}
      //make bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        if (err) {
			console.log('principal already exists');
		}  else {
			console.log('Created principal:', principal);
		}
      });
    });
  });
};