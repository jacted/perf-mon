var config = {
	date: {
		timezone: 'Europe/Berlin'
	},
	stats: {
		domain: 'localhost'
	},
	web: {
		port: process.env.WEB_PORT || 8080
	},
	slack: {
		token: 'xoxb-TOKEN',
		name: 'perf-mon'
	},
	db: 'mongodb://username:password@host:port/database'
};

module.exports = config;