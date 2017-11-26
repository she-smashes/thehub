'use strict';
var assert = require('chai').assert;
var loopback = require('loopback');
var supertest = require('supertest');
var app = require('../server/server');
var tests = require('./apiTestConfig.json');
var async = require('async');
var superagent;
 var dataSource = app.dataSource('testdb', {
  "name": "db",
  "connector": "memory",
  "file": "testdb.json"
});
 

var models = require('../server/model-config.json');
for (var key in models) {
  console.log('key = ' + key);
  if(key !== '_meta') {
  var model = loopback.getModel(key);
  loopback.configureModel(model, {dataSource: dataSource});
}
}


var url = "http://localhost:4000/api";
var baseURL = "/";

async.each(tests, function (data, asyncCallback) {

  var model = data.model;
  var method = data.method;
  var withData = data.withData;
  var expectStatus = data.expectStatus;
  var expectVar = data.expectVar;
  var expectValue = data.expectValue;
  var expectDescription = data.expectDescription;
  var username = "";
  var password = "";
  var count = data.count;

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
    var loginBlock;
    it(expectDescription, function (done) {

      let access_token = "";

      if (isWithAuthentication) {
        loginBlock = function (loginCallback) {
          var loginData = {};
          loginData.username = data.username;
          loginData.password = data.password;
          var supragent = supertest.agent(url);
          supragent
            .post(baseURL + 'users/login')
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

      var agent = supertest.agent(url);
      if (method.toUpperCase() === 'LOGIN') {
        agent
          .post(baseURL + model + '/login')
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
          var urlToHit = baseURL + model;
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
              } else if (method.toUpperCase() === 'POST') {
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

