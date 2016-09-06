// BASE SETUP 
// ====================================================
var express 	= require('express'),
	app 		= express(),
	bodyParser 	= require('body-parser'),
	config 		= require('./config'),
	mongoose   	= require('mongoose'),
	Log 		= require('./models/log'), 
	CronJob 	= require('cron').CronJob,
	cors 		= require('cors'),
	SlackBot 	= require('slackbots');

// Setup Mongoose 
// ====================================================
mongoose.Promise = global.Promise;
mongoose.connect(config.db);

// Cors 
// ====================================================
app.use(cors());

// Setup bodyparser 
// ====================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup script folder 
// ====================================================
app.use(express.static('script'));

// Setup Slack Bot
// ====================================================
var bot = new SlackBot(config.slack);

bot.on('message', function(data) {

	if(data.type == "message") {
		if(data.text == "perf report") {
			fetchLast24Hours();
		}
	}

});

// Fetch last 24 hours logs
// ====================================================
var fetchLast24Hours = () => {

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

// Log post
// ====================================================
app.post('/log', function (req, res) {
	
	// Version
	let version 	= req.body.version;

	// Visitor
	let visitorID 	= req.body.visitorId;

	// Hostname
	let sitedomain 	= req.body.siteDomainName;
	let hostname 	= sitedomain.hostname;

	// Performance
	let performance = req.body.performance;

	if(typeof performance != "undefined") {

		// Load time
		let loadTime 				= performance.domContentLoadedEventEnd - performance.navigationStart;

		// DNS
		let dns 					= performance.domainLookupStart - performance.domainLookupEnd;
		if(dns < 0) {
			dns = 0;
		}

		// Latency 
		// (How long it takes the response to get to the user’s device. This includes the time it takes for the request to get to the server, 
		// the time it takes the server to render a response, and the time until the first byte of that response gets back to the user’s phone)
		let latency 				= performance.responseStart - performance.fetchStart;

		// Transfer (How long it takes the browser to download the response from the server)
		let transfer 				= performance.responseEnd - performance.responseStart;

		// DOM - (How long the browser spends loading the webpage until the user can starting interacting with it)
		let domToInteractive 		= performance.domInteractive - performance.domLoading;

		// DOM - (How long it takes for the browser to load images/videos and execute any Javascript code listening for the DOMContentLoaded event)
		let interactiveToComplete 	= performance.domComplete - performance.domInteractive;

		// Save data
		var log = new Log();

		log.visitorid 					= visitorID;
		log.hostname 					= hostname;
		log.load_time					= loadTime;
		log.dns 						= dns;
		log.latency 					= latency;
		log.transfer 					= transfer;
		log.dom_to_interactive 			= domToInteractive;
		log.interactive_to_completed 	= interactiveToComplete;

		// Save log
		log.save((err) => {
			if(err) {
				console.log(err);
			}
		})

	}

});

// Setup cronjob (00:08:00)
// ====================================================
new CronJob('00 08 00 * * *', function() {
  fetchLast24Hours();
}, null, true, config.date.timezone);

// Start server
// ====================================================
app.listen(config.web.port, function () {
	console.log("Server started");
});