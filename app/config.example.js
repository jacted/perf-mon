'use strict'

var config = {
	date: {
		timezone: 'Europe/Berlin'
	},
	stats: {
		domain: 'localhost'
	},
	web: {
		port: process.env.PORT || 8080
	},
	slack: {
		token: 'xoxb-TOKEN',
		name: 'Speed Monitor',
		channel: 'general'
	},
	db: 'mongodb://username:password@host:port/database'
};

module.exports = config;