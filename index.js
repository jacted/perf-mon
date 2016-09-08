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
    console.log("Connection closed... Reconnecting.")
	bot.login();
});

bot.on('message', function(data) {


	// Commands on message
	if(data.type == "message") {

		switch(data.text) {
			case 'speed report':
				slack.sendReport(bot, data.channel);
			break;
			case 'speed report full':
				slack.sendReport(bot, data.channel, true);
			break;
			case 'speed help':
				slack.sendHelp(bot, data.channel);
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