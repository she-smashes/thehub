'use strict';

const sampleInitiativeData = require('./createInitiativeList.json');
const sampleEventData = require('./createEventList.json');


module.exports = function (app, cb) {
	const eventPromises = [];

	Object.keys(sampleInitiativeData).forEach(modelName => {
		const Model = app.models[modelName];
		const modelItems = sampleInitiativeData[modelName];

		modelItems.forEach(modelItem => {
			app.models.initiative.findOne({ where: { 'title': modelItem.title } }, function (err, oldInitiative) {
				if (!oldInitiative) {
					app.models.user.findOne({ where: { 'username': modelItem.leadUser } }, function (err, initiativeLeadUser) {
						if (initiativeLeadUser) {
							app.models.user.findOne({ where: { 'username': modelItem.createdByUser } }, function (err, initiativeCreatedUser) {
								if (initiativeCreatedUser) {
									modelItem.lead = initiativeLeadUser.id;
									modelItem.createdBy = initiativeCreatedUser.id;
									modelItem.createdOn = new Date(modelItem.createdOn);
									delete modelItem.leadUser;
									delete modelItem.createdByUser;

									Promise.resolve(Model.upsertWithWhere({ 'title': modelItem.title }, modelItem))
										.then(function (eventInitiative) {

											const eventModelItems = sampleEventData['event'];
											const eventModel = app.models['event'];
											eventModelItems.forEach(eventmodelItem => {
												if (eventmodelItem.initiative === eventInitiative.title) {
													app.models.event.findOne({ where: { 'title': eventmodelItem.title } }, function (err, oldEvent) {
														if (!oldEvent) {

															eventmodelItem.initiativeId = eventInitiative.id;

															app.models.category.findOne({ where: { 'name': eventmodelItem.category } }, function (err, eventCategory) {
																if (eventCategory) {

																	eventmodelItem.categoryId = eventCategory.id;
																	app.models.user.findOne({ where: { 'username': eventmodelItem.leadUser } }, function (err, eventLeadUser) {
																		if (eventLeadUser) {

																			eventmodelItem.lead = eventLeadUser.id;

																			app.models.user.findOne({ where: { 'username': eventmodelItem.createdByUser } }, function (err, eventCreatedByUser) {
																				if (eventCreatedByUser) {
																					eventmodelItem.createdBy = eventCreatedByUser.id;
																					eventmodelItem.createdOn = new Date(eventmodelItem.createdOn);
																					eventmodelItem.startDate = new Date(eventmodelItem.startDate);
																					eventmodelItem.endDate = new Date(eventmodelItem.endDate);
																					eventmodelItem.participantId = [1, 2];

																					delete eventmodelItem.category;
																					delete eventmodelItem.initiative;
																					delete eventmodelItem.createdByUser;
																					delete eventmodelItem.leadUser;

																					eventPromises.push(eventModel.upsertWithWhere({ 'title': eventmodelItem.title }, eventmodelItem));
																				}
																			});
																		}
																	});

																}
															});



														}
													});
												}
											})
										});
								}
							});
						}
					});
				}
			});
		})
	});


	Promise.all(eventPromises)
		.then((res) => {
			console.log('Events set up ' + res.length);
			return cb();
		});
};
