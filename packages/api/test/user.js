var assert = require('chai').assert,
    superagent = require('superagent'),
    app = require('../server/server');

describe('user model', function () {
    var server;

    beforeEach(function (done) {
        server = app.listen(done);
    });

    afterEach(function (done) {
        server.close(done);
    });

    it('should log in and log out with live server', function (done) {
        this.timeout(10000);
        superagent
            .post('http://localhost:4000/api/users/login')
            .send({ email: 'approver1@example.com', password: 'approver1' })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, loginRes) {
                if (err) { return done(err); }
                assert.equal(loginRes.status, 200);
                assert.ok(loginRes.body);
                assert.equal(loginRes.body.userId, 7);
                done();
            });
    });
});
