var Log     = require('./models/log'),
 	config  = require('./config'); 

var sendReport = (bot) => {

	// Domain
	let domain = config.stats.domain;

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
				max: 0
			},
			dns: {
				avg: 0,
				min: 0,
				max: 0
			},
			latency: {
				avg: 0,
				min: 0,
				max: 0
			},
			transfer: {
				avg: 0,
				min: 0,
				max: 0
			},
			dom_to_interactive: {
				avg: 0,
				min: 0,
				max: 0
			},
			interactive_to_completed: {
				avg: 0,
				min: 0,
				max: 0
			}
		}

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

				// IF values is more than 1000, it's seconds
				if(obj[prop] > 1000) {

					final[key][prop] = (obj[prop]/1000)+'s';

				} else {

					// It's milliseconds
					final[key][prop] = obj[prop]+'ms';

				}

			}

		}

		// Msg Text
		let msgText = 'The average load time of '+domain+' in the last 24 hours was '+final.load_time.avg+' sampled from '+logs.length+' users. The fastest was '+final.load_time.min+', the slowest was '+final.load_time.max+'.';

		// Bot params
		var params = {
			icon_emoji: ':robot_face:',
			attachments: JSON.stringify([
				{
					"fallback": msgText,
					"color": "#36a64f",
					"title": "Performance report for "+domain,
					"text": msgText,
					"fields": [
						{
							"title": "Load Complete",
							"value": final.load_time.avg,
							"short": true
						},
						{
							"title": "DNS",
							"value": final.dns.avg,
							"short": true
						},
						{
							"title": "Dom To Interactive",
							"value": final.dom_to_interactive.avg,
							"short": true
						},
						{
							"title": "Interactive To Completed",
							"value": final.interactive_to_completed.avg,
							"short": true
						},
						{
							"title": "Latency",
							"value": final.latency.avg,
							"short": true
						},
						{
							"title": "Transfer",
							"value": final.transfer.avg,
							"short": true
						}
					],
					"ts": Math.round(new Date().getTime()/1000)
				}
			])
		};
 

		bot.postMessageToChannel('general', '', params).then((data) => {
		});

	});

}

var sendHelp = (bot) => {

	// Bot params
	var params = {
		icon_emoji: ':robot_face:',
			attachments: JSON.stringify([
				{
					"fallback": "Perf-mon help",
					"color": "#36a64f",
					"title": "Perf-mon help",
					"text": "Perf-mon explained",
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
				}
			])
	}

	bot.postMessageToChannel('general', '', params).then((data) => {
	});
 
}

module.exports = {
	sendReport: sendReport,
	sendHelp: sendHelp
}