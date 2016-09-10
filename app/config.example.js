'use strict'

var config = {
	date: {
		timezone: 'Europe/Berlin'
	},
	domains: [
		{
			alias: 'localhost',
			domain: 'localhost.com'
		}
	],
	web: {
		port: process.env.PORT || 8080
	},
	slack: {
		enabled: true,
		token: 'TOKEN'
	},
	rocketchat: {
		enabled: true,
		token: 'TOKEN'
	},
	db: 'mongodb://username:password@host:port/database'
};

module.exports = config;