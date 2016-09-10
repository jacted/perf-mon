var chai = require('chai'),
    expect = chai.expect,
    config = require('../app/config');

describe('Config', function() {

	// Date
	it('date should be set', function() {
		expect(config).to.have.property('date');
	});
	it('date should contain timezone', function() {
		expect(config.date).to.have.property('timezone');
	});

	// Domains
	it('domains should be set', function() {
		expect(config).to.have.property('domains');
	});
    it('domains should be array', function() {
        expect(config.domains).to.be.a('array');
    }); 
    it('domain should contain alias and domain', function() {
    	var domain = config.domains[0];
    	expect(domain).to.have.property('alias');
    	expect(domain).to.have.property('domain');
    });

    // Web
	it('web should be set', function() {
		expect(config).to.have.property('web');
	});
	it('web should contain port', function() {
		expect(config.web).to.have.property('port');
	});

    // Slack
	it('slack should be set', function() {
		expect(config).to.have.property('slack');
	});
	it('slack should contain token', function() {
		expect(config.slack).to.have.property('token');
	});

    // Rocketchat
	it('rocketchat should be set', function() {
		expect(config).to.have.property('rocketchat');
	});
	it('rocketchat should contain token', function() {
		expect(config.rocketchat).to.have.property('token');
	});

    // Mattermost
	it('mattermost should be set', function() {
		expect(config).to.have.property('mattermost');
	});
	it('mattermost should contain token', function() {
		expect(config.mattermost).to.have.property('token');
	});

    // DB
	it('db should be set', function() {
		expect(config).to.have.property('db');
	});
	it('db should be a string', function() {
		expect(config.db).to.be.a('string');
	});

});