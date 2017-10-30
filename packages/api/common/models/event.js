'use strict';

module.exports = function(Event) {
  Event.listEvents = function(cb) {
    Event.find({}, cb);
  };
  Event.remoteMethod('listEvents', {
    returns: {arg: 'events', type: 'array'},
    http: {path:'/list-events', verb: 'get'}
  });
};
