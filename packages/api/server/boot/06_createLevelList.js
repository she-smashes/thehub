'use strict';

const sampleLevelData = require('./createLevelList.json');

module.exports = function(app, cb) {
  const promises = [];

  Object.keys(sampleLevelData).forEach(modelName => {
    const Model = app.models[modelName];
    const modelItems = sampleLevelData[modelName];

    modelItems.forEach(modelItem => {
      app.models.category.findOne({where: {'name': modelItem.category}},
        function(err, levelCategory) {
          if (levelCategory) {
            modelItem.categoryId = levelCategory.id;
            delete modelItem.category;
            promises.push(Model.upsertWithWhere({
              'name': modelItem.name,
              'categoryId': modelItem.categoryId,
            }, modelItem));
          }
        });
    });
  });

  Promise.all(promises)
    .then((res) => {
      console.log('Levels set up ' + res.length);
      return cb();
    });
};
