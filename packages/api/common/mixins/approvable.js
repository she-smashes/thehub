'use strict';

module.exports = function(Model, options) {
  Model.defineProperty('type', {type: String});
  Model.defineProperty('approvableId', {type: String});
  Model.defineProperty('approvableIds', {
    'type': 'array',
    'items': {
      'type': 'string',
    },
  });
  Model.defineProperty('parentType', {type: String});
  Model.defineProperty('parentTypeId', {type: String});
};

