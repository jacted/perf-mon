'use strict'

var config = require('./config'); 

var getDomainByAlias = (command, text) => {
    let alias = text.replace(command, '').trim();
    let domains = config.domains
    for (var i = 0; i < domains.length; i++) {
        if(domains[i].alias == alias) return domains[i].domain
    }
    return false
}

var getCommandName = (text) => {

    // COMMAND - Speed report full
    if(text.indexOf('speed report full') !== -1) {
        return 'speed report full'
    }

    // COMMAND - Speed report
    if(text.indexOf('speed report') !== -1) {
        return 'speed report'
    }

    // COMMAND - Speed help
    if(text.indexOf('speed help') !== -1) {
        return 'speed help'
    }

    return false;

}

module.exports = {
    getDomainByAlias: getDomainByAlias,
    getCommandName: getCommandName
}