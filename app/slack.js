'use strict'

var Log     = require('./models/log'),
 	config  = require('./config'),
	data	= require('./data/data');

var sendReport = (bot, channel, full) => {

	// Get log data
	data.getLogData().then((perfData) => {

		// Params
		let params = data.getPerfMessageData(perfData[0], perfData[1], full);
		
		// Channel
		if(typeof channel == "undefined") {
			channel = config.slack.channel;
			bot.postMessageToChannel(channel, '', params).then((data) => {
			});
		} else {
			bot.postMessage(channel, '', params).then((data) => {
			});
		}

	}); 

}

var sendHelp = (bot, channel) => {

	let params = data.getHelpMessageData();

	// Channel
	if(typeof channel == "undefined") {
		channel = config.slack.channel;
		bot.postMessageToChannel(channel, '', params).then((data) => {
		});
	} else {
		bot.postMessage(channel, '', params).then((data) => {
		});
	}
 
}

module.exports = {
	sendReport: sendReport,
	sendHelp: sendHelp
}