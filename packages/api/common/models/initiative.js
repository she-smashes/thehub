'use strict';

module.exports = function(Initiative) {

  Initiative.listInitiatives = function(cb) {
    Initiative.find({}, cb);
  };
  Initiative.remoteMethod('listInitiatives', {
    returns: {arg: 'initiatives', type: 'array'},
    http: {path:'/list-initiatives', verb: 'get'}
  });
};
