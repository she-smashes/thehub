'use strict';

const sampleLevelData = require('./createLevelList.json');

module.exports = function(app, cb) {
  const promises = [];
  const catPromises = [];
  Object.keys(sampleLevelData).forEach(modelName => {
    const Model = app.models[modelName];
    const modelItems = sampleLevelData[modelName];
    modelItems.forEach(modelItem => {
      console.log(modelItem.category);
      catPromises.push(new Promise(function(resolve) {
        app.models.category.findOne(
          {
            where: {
              'name': modelItem.category,
            },
          }, function(err, levelCategory) {
          if (levelCategory) {
            modelItem.categoryId = levelCategory.id;
            delete modelItem.category;
          }
          resolve();
        });
      }));
    });
  });

  Promise.all(catPromises)
    .then((res) => {
      Object.keys(sampleLevelData).forEach(modelName => {
        const Model = app.models[modelName];
        const modelItems = sampleLevelData[modelName];
        modelItems.forEach(modelItem => {
          promises.push(new Promise(function(resolve) {
            Model.upsertWithWhere({
              'name': modelItem.name,
              'categoryId': modelItem.categoryId,
            }, modelItem, function(err, i) {
              console.log(i);
              resolve();
            });
          }));
        });
      });
      Promise.all(promises)
        .then((res) => {
          console.log('Levels set up ' + res.length);
          cb();
        });
    });
};
