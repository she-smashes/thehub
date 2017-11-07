'use strict';

const sampleData = require('./createEventList.json');

module.exports = function (app, cb) {

const promises = []; 
	Object.keys(sampleData).forEach(modelName => {
		const Model = app.models[modelName];
		const modelItems = sampleData[modelName];
					
		modelItems.forEach(modelItem => {
			
			app.models.event.findOne({where: {title: modelItem.title}}, function(err, oldEvent) {
				if(!oldEvent) {
					app.models.initiative.findOne({where: {title: modelItem.initiative}}, function(err, eventInitiative) {
						if(eventInitiative) {
							modelItem.initiativeId = eventInitiative.id;
							modelItem.categoryId = eventInitiative.categoryId;
							app.models.user.findOne({where: {username: modelItem.user}}, function(err, eventUser) {
								if(eventUser) {
									modelItem.lead = eventUser.id;
									promises.push(Model.upsertWithWhere({ 'name': modelItem.title }, modelItem));
									delete modelItem.category;
									delete modelItem.user;
								}
							});
						}
					});
				}
			});
		})
	});
	
		 Promise.all(promises.map(p => p.catch(() => undefined)))
			.then((res) => {
				console.log('Events set up', res.length);
			  	console.log('Sample Events set up successfully');
				return cb();
			});	
};
