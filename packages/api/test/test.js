var assert = require('chai').assert,
  superagent = require('superagent'),
  app = require('../server/server'),
  tests = require('./apiTestConfig.json'),
  async = require('async');

/* var dataSource = app.dataSource('testdb', {
  "name": "db",
  "connector": "memory",
  "file": "test.json"
});
 */
var baseURL = "http://localhost:4000/api";

async.each(tests, function (data, asyncCallback) {

  var model = data.model,
    method = data.method,
    withData = data.withData,
    expectStatus = data.expectStatus,
    expectVar = data.expectVar,
    expectValue = data.expectValue,
    expectDescription = data.expectDescription,
    username = "",
    password = "",
    count = data.count;


  var isWithAuthentication = (data.hasOwnProperty('username') && data.hasOwnProperty('password'));
  if (isWithAuthentication) {
    username = data.username;
    password = data.password;
  }

  describe(data.model + ' model', function () {
    var server;

    beforeEach(function (done) {
      server = app.listen(done);
    });

    afterEach(function (done) {
      server.close(done);
    });

    it(expectDescription, function (done) {

      let access_token = "";
      var supragent = superagent;
      var authURLToHit = baseURL + '/' + 'users';
      if (isWithAuthentication) {
        loginBlock = function (loginCallback) {
          authURLToHit = authURLToHit + '/' + 'login';
          var loginData = {};
          loginData.username = data.username;
          loginData.password = data.password;
          supragent
            .post(authURLToHit)
            .send(loginData)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
              if (err) { return done(err); }
              access_token = res.body.id;
              return loginCallback(null, access_token);
            });
        }
      } else {
        loginBlock = function (loginCallback) {
          return loginCallback(null, null);
        };
      }

      var agent = superagent;
      urlToHit = baseURL + '/' + model;
      if (method.toUpperCase() === 'LOGIN') {
        urlToHit = urlToHit + '/' + method;
        agent
          .post(urlToHit)
          .send(withData)
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end(function (err, res) {
            if (err) { return done(err); }
            assert.equal(res.status, expectStatus);
            assert.equal(res.body[expectVar], expectValue);
            done();
          });
      } else {
       
        loginBlock(function (loginError, loginToken) {
          if (loginError) {
            done(loginError);
            return asyncCallback();
          }

          if (method.toUpperCase() === 'GET') {
            if (count === "true") {
              urlToHit = urlToHit + "/count"
            }
            agent = agent.get(urlToHit);
          } else if (method.toUpperCase() === 'POST') {
            agent = agent.post(urlToHit).send(withData);
          } else if (method.toUpperCase() === 'PUT') {
            agent = agent.put(urlToHit).send(withData);
          } else if (method.toUpperCase() === 'DELETE') {
            agent = agent.delete(urlToHit);
          } else if (method.toUpperCase() === 'PATCH') {
            agent = agent.patch(urlToHit);
          }
          if (loginToken) {
            agent = agent.set('Authorization', loginToken);
          }
          agent
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
              if (err) { return done(err); }
              assert.equal(res.status, expectStatus);
              if (count === 'true') {
                assert.isAbove(res.body[expectVar], expectValue);
              } else if(method.toUpperCase() === 'POST'){
                assert.isNotEmpty(res.body[expectVar] + "", expectValue);
              } else {
                assert.equal(res.body[expectVar] + "", expectValue);
              }
              done();
            });
        });
      }
    });
  });
});

