// BASE SETUP 
// ====================================================
var express 	= require('express'),
	app 		= express(),
	bodyParser 	= require('body-parser'),
	cors 		= require('cors'),
	mongoose   	= require('mongoose'),
	CronJob 	= require('cron').CronJob,
	SlackBot 	= require('slackbots'),
	config 		= require('./app/config'),
	Log 		= require('./app/models/log'),
	slack 		= require('./app/slack');

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

bot.on('error', function(err) {
	console.log("error upps", err);
});

bot.on('message', function(data) {

	// Commands on message
	if(data.type == "message") {

		switch(data.text) {
			case 'perf report':
				slack.sendReport(bot);
			break;
			case 'perf help':
				slack.sendHelp(bot);
			break;
		}

	}

});

// Log post
// ====================================================
require('./app/routes/log')(app);

// Setup cronjob (00:08:00)
// ====================================================
new CronJob('00 08 00 * * *', function() {
  slack.sendReport(bot);
}, null, true, config.date.timezone);

// Start server
// ====================================================
app.listen(config.web.port, function () {
	console.log("Server started");
});