'use strict'

// BASE SETUP 
// ====================================================
var express 	= require('express'),
	app 		= express(),
	bodyParser 	= require('body-parser'),
	cors 		= require('cors'),
	mongoose   	= require('mongoose'),
	config 		= require('./app/config')

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
if(config.slack.enabled) {
	require('./app/routes/slack')(app);
}

// Rocket chat
// ====================================================
if(config.rocketchat.enabled) {
	require('./app/routes/rocketchat')(app);
}

// Log post
// ====================================================
require('./app/routes/log')(app);

// Start server
// ====================================================
app.listen(config.web.port, function () {
	console.log("Server started");
});