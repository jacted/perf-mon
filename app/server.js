'use strict'

// BASE SETUP 
// ====================================================
var express 	= require('express'),
	app 		= express(),
	bodyParser 	= require('body-parser'),
	cors 		= require('cors'),
	mongoose   	= require('mongoose'),
	config 		= require('./config')

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

// Hook
// ====================================================
require('./routes/hook')(app);

// Log post route
// ====================================================
require('./routes/log')(app);

// Start server
// ====================================================
var server = app.listen(config.web.port, function () {
});

module.exports = server;