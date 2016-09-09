'use strict'

var config = require('../config'),
	data = require('../data/data')

module.exports = function(app){

	app.post('/slack', function (req, res) {

		// Check token
		if(req.body.token == config.slack.token) {

			// IF is not a bot
			if(!req.body.bot) {

				let text = req.body.text;

				switch(text) {
					case 'speed report':
						data.getLogData().then((perfData) => {
							let params = data.getPerfMessageData(perfData[0], perfData[1]);
							res.send(params);
						});
					break;
					case 'speed report full':
						data.getLogData().then((perfData) => {
							let params = data.getPerfMessageData(perfData[0], perfData[1], true);
							res.send(params);
						});
					break;
					case 'speed help':
						let params = data.getHelpMessageData();
						res.send(params);
					break;
				}

			}

		}

	});

}