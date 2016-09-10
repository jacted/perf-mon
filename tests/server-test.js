var chai = require('chai'),
    expect = chai.expect,
    request = require('supertest'),
    config = require('../app/config');

describe('Server', function() {
    var server;
    beforeEach(function () {
        server = require('../app/server');
    });
    afterEach(function () {
        server.close();
    });

    // Slack
    it('responds to /slack', function(done) {
        request(server)
            .post('/slack')
            .expect(200, done);
    });

    // Rocket.chat
    it('responds to /rocketchat', function(done) {
        request(server)
            .post('/rocketchat')
            .expect(200, done);
    });

    // Mattermost
    it('responds to /mattermost', function(done) {
        request(server)
            .post('/mattermost')
            .expect(200, done);
    });


    // Responds with data
    it('responds to hooks with data', function(done) {
        request(server)
            .post('/slack')
            .send({
                token: config.slack.token,
                text: 'speed report localhost',
                bot: false
            })
            .expect(200)
            .end(function(err, res) {

                expect(res.body).to.have.property('icon_emoji');
                expect(res.body).to.have.property('attachments');

                done();

            });
    });

});