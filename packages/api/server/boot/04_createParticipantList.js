'use strict';

const sampleData = require('./createParticipantList.json');

module.exports = function(app, cb) {
  const promises = [];

  Object.keys(sampleData).forEach(modelName => {
    const Model = app.models[modelName];
    const modelItems = sampleData[modelName];

    modelItems.forEach(modelItem => {
      promises.push(Model.upsertWithWhere(
        {
          'participantType': modelItem.participantType,
          'hourly': modelItem.hourly,
        }
        , modelItem));
    });
  });

  Promise.all(promises.map(p => p.catch(() => undefined)))
    .then((res) => {
      console.log('Participants set up', res.length);
      return cb();
    });
};

function errorHandler(promises) {
  console.log('error');
}
