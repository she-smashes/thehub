'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

exports.default = function(app) {
  if (!BootScriptConfig.isEnabled('tokenRefresh')) {
    return;
  }

  var onceIn = BootScriptConfig.get(['tokenRefresh', 'onceIn'], 86400);
  var ttl = BootScriptConfig.get(['tokenRefresh', 'ttl'], 86400 * 30);
  var loopback = require('loopback');
  app.use(loopback.token());
  app.use(function(req, res, next) {
    var token = req.accessToken;
    console.log('token', token);
    if (!token) {
      return next();
    }

    var now = new Date();

    if (now.getTime() - token.created.getTime() < onceIn) {
      console.log('not reset');
      return next();
    }

    console.log('reset');
    token.created = now;
    token.ttl = ttl;
    token.save(next);
  });
};
