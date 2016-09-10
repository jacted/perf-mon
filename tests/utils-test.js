var chai = require('chai'),
    expect = chai.expect,
    utils = require('../app/utils');

describe('Utils', function() {

    // getCommandName
    it('getCommandName() should return string if command exists', function() {
        var command = utils.getCommandName('speed report');
        expect(command).to.be.a('string');
    }); 

    it('getCommandName() should return false if command does not exist', function() {
        var command = utils.getCommandName('hello there robot');
        expect(command).to.equal(false);
    });

    // getDomainByAlias
    it('getDomainByAlias() should return string if alias exists', function() {
        var command = utils.getDomainByAlias('speed report', 'speed report localhost');
        expect(command).to.be.a('string'); 
    }); 

    it('getDomainByAlias() should return false if alias does not exist', function() {
        var command = utils.getDomainByAlias('speed report', 'speed report domainalias');
        expect(command).to.equal(false); 
    }); 

});