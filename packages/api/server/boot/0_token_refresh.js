'use strict';

module.exports = function(app, cb) {
  console.log('aaaaaaaaaaaaaaaaaa');
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
      console.log(configs);
      app.use(loopback.token());
      app.use(function(req, res, next) {
        var token = req.accessToken;
        console.log('token', token);
        if (!token) {
          return next();
        }
        var now = new Date();
        let onceIn = configs[0].value * 60;
        let ttl = configs[1].value;
        console.log(now.getTime());
        console.log(token.created.getTime());
        console.log(now.getTime() - token.created.getTime());
        console.log(onceIn);
        if (now.getTime() - token.created.getTime() < onceIn) {
          console.log('not reset');
          return next();
        }
        console.log('reset');
        token.created = now;
        token.ttl = ttl;
        token.save(next);
      });
      cb();
    });
};
