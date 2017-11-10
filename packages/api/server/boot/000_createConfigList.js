'use strict';

const sampleData = require('./createConfigList.json');

module.exports = function (app, cb) {

  const promises = [];

  Object.keys(sampleData).forEach(modelName => {
    const Model = app.models[modelName];
    const modelItems = sampleData[modelName];

    modelItems.forEach(modelItem => {
      promises.push(Model.upsertWithWhere({ 'name': modelItem.name }, modelItem));
    })
  });
  Promise.all(promises.map(p => p.catch(() => undefined)))
    .then((res) => {
      console.log('Configuration set up', res.length);
      return cb();
    });
};