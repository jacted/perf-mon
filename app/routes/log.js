
'use strict'
var Log     = require('../models/log'),
 	config  = require('../config'); 

module.exports = function(app){

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
			let dns 					= performance.domainLookupEnd - performance.domainLookupStart;
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

}