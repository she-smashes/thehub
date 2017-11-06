'use strict';

const sampleData = require('./createInitiativeList.json');

module.exports = function (app, cb) {

const promises = []; 
	Object.keys(sampleData).forEach(modelName => {
		const Model = app.models[modelName];
		const modelItems = sampleData[modelName];
					
		modelItems.forEach(modelItem => {
			
			app.models.initiative.findOne({where: {title: modelItem.title}}, function(err, oldInitiative) {
				if(!oldInitiative) {
					app.models.category.findOne({where: {name: modelItem.category}}, function(err, initiativeCategory) {
						if(initiativeCategory) {
							modelItem.categoryId = initiativeCategory.id;
							promises.push(Model.upsertWithWhere({ 'name': modelItem.title }, modelItem));
							delete modelItem.category;
						}
					});
				}
			});
		})
	});
	
		 Promise.all(promises.map(p => p.catch(() => undefined)))
			.then((res) => {
				console.log('Initiatives set up', res.length);
			  	console.log('Sample categories and initiatives set up successfully');
				return cb();
			});	
};
