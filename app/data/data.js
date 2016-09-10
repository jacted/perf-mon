'use strict'

var Log = require('../models/log'); 

var getLogData = (domain) => {

	return new Promise(function(resolve, reject) {

		Log
		.find({
			"created": { $gt: new Date(Date.now() - 24*60*60 * 1000) },
			"hostname": domain
		})
		.exec((err, logs) => {

			let final = {
				load_time: {
					avg: 0,
					min: 0,
					max: 0,
					full: ''
				},
				dns: {
					avg: 0,
					min: 0,
					max: 0,
					full: '',
				},
				latency: {
					avg: 0,
					min: 0,
					max: 0,
					full: ''
				},
				transfer: {
					avg: 0,
					min: 0,
					max: 0, 
					full: ''
				},
				dom_to_interactive: {
					avg: 0,
					min: 0,
					max: 0,
					full: ''
				},
				interactive_to_completed: {
					avg: 0,
					min: 0,
					max: 0,
					full: ''
				}
			}

			// Foreach log row
			logs.forEach((log) => {
			
				for(let key in final) {
	    			if (!final.hasOwnProperty(key)) continue;

					let val = log[key];

					// Avg
					final[key].avg += val;

					// Max
					if(val > final[key].max) {
						final[key].max = val;
					}

					// Min
					if(val < final[key].min || final[key].min == 0) {
						final[key].min = val;
					}

				}

			});

			// Logs length
			let logsLength = logs.length;
			if(logsLength == 0) {
				logsLength = 1;
			}

			// Run through final
			for(let key in final) {
	    		if (!final.hasOwnProperty(key)) continue;

	    		// Make average
	    		final[key].avg = final[key].avg / logsLength;

	    		// Make values
				var obj = final[key];
				for (let prop in obj) { 
					if(!obj.hasOwnProperty(prop)) continue;

					// Add to full string
					if(prop != "full") {

						// IF values is more than 1000, it's seconds
						if(obj[prop] > 1000) {

							final[key][prop] = (obj[prop]/1000).toFixed(2)+'s';

						} else {

							// It's milliseconds
							final[key][prop] = obj[prop].toFixed(2)+'ms';

						}

						let prefix = (final[key].full == "") ? '' : ' - ';
						final[key].full += prefix+(prop.charAt(0).toUpperCase() + prop.slice(1))+': '+final[key][prop];

					}

				}

			}

			resolve([final, logs.length]);

		});

	});

} 

var getPerfMessageData = (domain, final, logsLength, full) => {

	// Msg Text
	let msgText = 'The average load time of '+domain+' in the last 24 hours was '+final.load_time.avg+' sampled from '+logsLength+' users. The fastest was '+final.load_time.min+', the slowest was '+final.load_time.max+'.';

	// Bot params
	var params = {
		icon_emoji: ':robot_face:',
		attachments: [
			{
				"fallback": msgText, 
				"color": "#36a64f",
				"title": "Performance report for "+domain,
				"text": msgText,
				"fields": [
					{
						"title": "Load Complete",
						"value": (full) ? final.load_time.full : final.load_time.avg,
						"short": (full) ? false : true
					},
					{
						"title": "DNS",
						"value": (full) ? final.dns.full : final.dns.avg,
						"short": (full) ? false : true
					},
					{
						"title": "Dom To Interactive",
						"value": (full) ? final.dom_to_interactive.full : final.dom_to_interactive.avg,
						"short": (full) ? false : true
					},
					{
						"title": "Interactive To Completed",
						"value": (full) ? final.interactive_to_completed.full : final.interactive_to_completed.avg,
						"short": (full) ? false : true
					},
					{
						"title": "Latency",
						"value": (full) ? final.latency.full : final.latency.avg,
						"short": (full) ? false : true
					},
					{
						"title": "Transfer",
						"value": (full) ? final.transfer.full : final.transfer.avg,
						"short": (full) ? false : true
					}
				],
				"ts": Math.round(new Date().getTime()/1000)
			}
		]
	};

	return params;

}

var getHelpMessageData = () => {

	// Bot params
	var params = {
		icon_emoji: ':robot_face:',
		attachments: [{
			"fallback": "Speed Monitor help",
			"color": "#36a64f",
			"title": "Speed Monitor help",
			"text": "Speed Monitor explained",
			"fields": [
				{
					"title": "Load Complete",
					"value": "How long it takes from navigation starts to dom content is loaded",
					"short": false
				},
				{ 
					"title": "DNS",
					"value": "How long it takes from domain lookup start to domain lookup end",
					"short": false
				},
				{
					"title": "Dom To Interactive",
					"value": "How long the browser spends loading the webpage until the user can starting interacting with it",
					"short": false
				},
				{
					"title": "Interactive To Completed",
					"value": "How long it takes for the browser to load images/videos and execute any Javascript code listening for the DOMContentLoaded event",
					"short": false
				},
				{
					"title": "Latency",
					"value": "How long it takes the response to get to the user’s device. This includes the time it takes for the request to get to the server, the time it takes the server to render a response, and the time until the first byte of that response gets back to the user’s phone",
					"short": false
				},
				{
					"title": "Transfer",
					"value": "How long it takes the browser to download the response from the server",
					"short": false
				}
			],
			"ts": Math.round(new Date().getTime()/1000)
		}]
	}

	return params;

}

module.exports = {
	getLogData: getLogData,
	getPerfMessageData: getPerfMessageData,
	getHelpMessageData: getHelpMessageData
}