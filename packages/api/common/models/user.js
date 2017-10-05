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
};
