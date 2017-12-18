'use strict';

const sampleBadgeData = require('./createBadgeList.json');

module.exports = function (app, cb) {
  const promises = [];

  Object.keys(sampleBadgeData).forEach(modelName => {
    const Model = app.models[modelName];
    const modelItems = sampleBadgeData[modelName];

    modelItems.forEach(modelItem => {
      app.models.category.findOne({ where: { 'name': modelItem.category } },
        function (err, badgeCategory) {
          if (badgeCategory) {
            app.models.level.findOne({ where: { 'name': modelItem.level, 'categoryId': badgeCategory.id } },
            function (err, badgeLevel) {
              if (badgeLevel) {
                modelItem.levelId = badgeLevel.id;
                delete modelItem.category;               
                promises.push(Model.upsertWithWhere({ 'levelId': modelItem.levelId, 'title': modelItem.title }, modelItem));
              }
            }
          );         
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
