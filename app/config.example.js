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
		enabled: true,
		token: 'xoxb-TOKEN',
		name: 'Speed Monitor',
		channel: 'general'
	},
	rocketchat: {
		enabled: false,
		token: 'TOKEN'
	},
	db: 'mongodb://username:password@host:port/database'
};

module.exports = config;