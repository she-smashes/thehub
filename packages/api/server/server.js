'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const request = require('request');
var cookieParser = require('cookie-parser');

var app = module.exports = loopback();
app.use(cookieParser());

var thirdPartyAuthDetails = {
  clientID: '',
  clientSecret: '',
  callbackURL: '',
  authorizationURL: '',
  tokenURL: '',
};
var thirdPartyAuthUserDetailsAPI = '';
var loginUser = function(user, resolve) {  
  app.models.user.login(
    {
      'username': user.username,
      'password': user.username,
    }, 'user', function(err, resp) {
      var accessToken = '';
      if (resp) {
        accessToken = resp.id;
      }
      resolve(accessToken);
    });
};
var createUser = function(username, email, location, resolve) {
  app.models.user.create(
    {
      username: username,
      password: username,
      email: email,
      location: location,
      registeredon: new Date(),
    }, function(err, userRecord) {
    resolve(userRecord);
  });
};

var findRole = function(resolve) {
  app.models.Role.findOne(
    {
      where:
      {
        name: 'employee',
      },
    }, function(err, role) {
    resolve(role);
  });
};

var performRoleMapping = function(role, usr, resolve) {
  role.principals.create({
    principalType: app.models.RoleMapping.USER,
    principalId: usr.id,
  }, function(err, principal) {
    resolve(principal);
  });
};

var findUser = function(username, resolve) {
  app.models.User.findOne(
    {
      where:
      {
        username: username,
      },
    },
    function(err, usr) {
      resolve(usr);
    });
};

var checkIfUserExists = function(app, userInfo, callback) {
  var username = userInfo.name;
  var location = userInfo.homeLocation;
  var email = userInfo.email;

  Promise.resolve(new Promise(function(resolve) {
    findUser(username, resolve);
  })).then((usrRecord) => {
    if (usrRecord) {
      callback(userInfo);
    } else {
      Promise.resolve(new Promise(function(resolve2) {
        createUser(username, email, location, resolve2);
      })).then((usr) => {
        if (usr) {
          Promise.resolve(new Promise(function(resolve3) {
            findRole(resolve3);
          })).then((role) => {
            if (role) {
              Promise.resolve(new Promise(function(resolve4) {
                performRoleMapping(role, usr, resolve4);
              })).then((principal) => {
                if (principal) {
                  callback(userInfo);
                }
              });
            }
          });
        }
      });
    }
  });
};

var useJive = function() {
  passport.use('jive', new OAuth2Strategy(thirdPartyAuthDetails,
    function(accessToken, refreshToken, profile, done) {
      done(null, accessToken);
    }
  ));
};
var authType = 'jive';
var methods = {
  auth: function(callback) {
    useJive();
    return passport.authenticate(authType, callback);
  },
  callback: function(req, res, callback) {
    useJive();
    return passport.authenticate(authType, function(err, token) {
      if (err || !token) {
        if (callback && typeof callback === 'function') {
          callback(err);
        }
      } else {
        callback(null, token);
      }
    })(req, res);
  },

};
app.get('/auth/user', function(req, res, next) {
  methods.auth(function() { })(req, res);
});
app.get('/callback', function(req, res, next) {
  methods.callback(req, res, function(err, token) {
    if (err) {
      return res.send(500, {
        err: err,
      });
    }
    if (token) {
      res.cookie('user_token', token, {
        maxAge: 3600000,
      });
      getUserDetails(token, function(userInfo) {
        if (!userInfo) {
          return res.send(400, {
            error: 'Not Authorized',
          });
        }
        checkIfUserExists(app, userInfo, function(userInfo) {
          return res.redirect('http://localhost:3000');
        });
      });
    }
  });
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
console.log(app.settings);
    thirdPartyAuthDetails.clientID = app.get('clientID');
    thirdPartyAuthDetails.clientSecret = app.get('clientSecret');
    thirdPartyAuthDetails.callbackURL = app.get('callbackURL');
    thirdPartyAuthDetails.authorizationURL = app.get('authorizationURL');
    thirdPartyAuthDetails.tokenURL = app.get('tokenURL');
    thirdPartyAuthUserDetailsAPI = app.get('userDetailsAPIURL');

    console.log(thirdPartyAuthDetails);
    
    console.log(thirdPartyAuthUserDetailsAPI);
    

    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
    }
  });
};

let bootOptions = {
  'appRootDir': __dirname,
  'bootDirs': [
    'bootScripts/',
  ],
};

/* To format Jive Response */
var parseJiveResponse = function(response) {
  //  'use strict';
  var trimmedResponse =
    response.replace('throw \'allowIllegalResourceCall is false.\';', '');
  return trimmedResponse !== '' ? JSON.parse(trimmedResponse) : {};
};
var getUserDetails = function(token, callback) {
  var options = {
    url: thirdPartyAuthUserDetailsAPI,
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };
  request(options, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      var userDetail = parseJiveResponse(body);
      var email;
      for (var i in userDetail.emails) {
        if (userDetail.emails[i].type == 'work') {
          email = userDetail.emails[i].value;
          break;
        }
      }
      var profile = {};
      for (var j in userDetail.jive.profile) {
        profile[userDetail.jive.profile[j]['jive_label']] =
          userDetail.jive.profile[j]['value'];
      }
      var contactNumber = {};
      for (var k in userDetail.phoneNumbers) {
        contactNumber[userDetail.phoneNumbers[k]['jive_label']] =
          userDetail.phoneNumbers[k]['value'];
      }
      var userInfo = {
        name: profile['Display Name'],
        email: email,
        careerStage: profile['Career Stage'],
        profilePic: userDetail.thumbnailUrl,
        ntId: userDetail.jive.username,
        homeLocation: profile['Home Office'],
        contact: contactNumber['Mobile Phone'],
        isActive: 1,
      };
      callback(userInfo);
    } else {
      callback(null);
    }
  });
};
app.get('/api/userdetails', function(req, res, next) {
  var cookieToken = req.cookies['user_token'];
  if (cookieToken != '') {
    getUserDetails(cookieToken, function(userInfo) {
      if (!userInfo) {
        return res.send(400, {
          error: 'Not Authorized',
        });
      }
      res.send(userInfo);
    });
  } else {
    res.send('{msg:Invalid Token}');
  }
});

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, bootOptions, function(err) {
  if (err) throw err;
  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

