'use strict';

module.exports = function(Model, options) {
  Model.defineProperty('type', {type: String});
  Model.defineProperty('approvableId', {type: String});
};

