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
		token: 'TOKEN'
	},
	rocketchat: {
		token: 'TOKEN'
	},
	mattermost: {
		token: 'TOKEN'
	},
	db: 'mongodb://username:password@host:port/database'
};

module.exports = config;