'use strict';

module.exports = function(app, cb) {
  var loopback = require('loopback');
  app.models.config.find({
    where: {
      or:
      [
        {name: 'refreshToken_onceIn'},
        {name: 'refreshToken_ttl'},
      ],
    },
  },
    function(err, configs) {
      app.use(loopback.token());
      app.use(function(req, res, next) {
        var token = req.accessToken;
        if (!token) {
          return next();
        }
        var now = new Date();
        let onceIn = configs[0].value * 60;
        let ttl = configs[1].value;
        if (now.getTime() - token.created.getTime() < onceIn) {
          return next();
        }
        token.created = now;
        token.ttl = ttl;
        token.save(next);
      });
      cb();
    });
};
