'use strict';

const sampleData = require('./create-role-list.json');

module.exports = function (app, cb) {

  const promises = [];

  Object.keys(sampleData).forEach(modelName => {
    const Model = app.models[modelName];
    const modelItems = sampleData[modelName];

    modelItems.forEach(modelItem => {
      promises.push(new Promise(resolve => {
        Model.upsertWithWhere({ 'name': modelItem.name }, modelItem).then(resolve);
      }))
    })
  });


  return Promise
    .all(promises)
    .then((res) => {
      console.log('Roles set up', res.length);
      return cb()
    })
    .catch(cb);

};