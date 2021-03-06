'use strict';

const sampleData = require('./createCategoryList.json');

module.exports = function(app, cb) {
  const promises = [];

  Object.keys(sampleData).forEach(modelName => {
    const Model = app.models[modelName];
    const modelItems = sampleData[modelName];

    modelItems.forEach(modelItem => {
      promises.push(new Promise(function(resolve) {
        Model.upsertWithWhere(
          {
            'name': modelItem.name,
            'type': modelItem.type,
          }, modelItem, function(err, i) {
            resolve();
          });
      }));
    });
  });

  Promise.all(promises.map(p => p.catch(() => undefined)))
    .then((res) => {
      console.log('Categories set up', res.length);
      return cb();
    });
};
