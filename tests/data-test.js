var chai = require('chai'),
    expect = chai.expect,
    mongoose = require('mongoose'),
    data = require('../app/data/data');

mongoose.Promise = global.Promise;

describe('Data', function() {
	
	// Help message
	it('getHelpMessageData() should return object', function() {
		expect(data.getHelpMessageData()).to.be.a('object');
	});

});