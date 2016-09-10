'use strict'

var config = require('../config'),
	data = require('../data/data'),
	utils = require('../utils');

module.exports = function(app){

	app.post(['/rocketchat', '/slack', '/mattermost'], function (req, res) {

		// Path
		let path = req._parsedUrl.pathname;

		// Token to check
		let token;
		if(path == "/rocketchat") {
			token = config.rocketchat.token;
		} else if(path == "/slack") {
			token = config.slack.token;
		} else {
			token = config.mattermost.token;
		}

		// Check token
		if(req.body.token == token) {

			// IF is not a bot
			if(!req.body.bot) {

				// Chat text
				let text = req.body.text.toLowerCase();

				// Parse chat text
				let command = utils.getCommandName(text);

				if(command) {

					// Get domain
					let domain = utils.getDomainByAlias(command, text);

					switch(command) {
						case 'speed report':
							if(domain) {
								data.getLogData(domain).then((perfData) => {
									let params = data.getPerfMessageData(domain, perfData[0], perfData[1]);
									res.send(params);
								});
							}
						break;
						case 'speed report full':
							if(domain) {
								data.getLogData(domain).then((perfData) => {
									let params = data.getPerfMessageData(domain, perfData[0], perfData[1], true);
									res.send(params);
								});
							}
						break;
						case 'speed help':
							let params = data.getHelpMessageData();
							res.send(params);
						break;
					}

				}

			}

		} else {
			res.send({ error: true });
		}

	});

}