const fs = require('fs')

class Configuration {
	properties = {
		TOKEN: null,
		CLIENT_ID: null,
		GUILD_ID: null,
		BOT_LOGS: null,
		SUGGESTIONS: null,
		REPORTS: null,
	}

	environmentOverrides = {
		DISCORD_TOKEN: val => (this.properties.TOKEN = val),
		DISCORD_CLIENT_ID: val => (this.properties.CLIENT_ID = val),
		DISCORD_GUILD_ID: val => (this.properties.GUILD_ID = val),
		BOT_LOGS: val => (this.properties.BOT_LOGS = val),
		REPORTS: val => (this.properties.REPORTS = val),
		SUGGESTIONS: val => (this.properties.SUGGESTIONS = val),
	}

	constructor() {
		if (fs.existsSync('config.json')) {
			this.properties = require('../config.json')
		}

		for (let environment of Object.keys(process.env)) {
			if (this.environmentOverrides.hasOwnProperty(environment)) {
				this.environmentOverrides[environment](process.env[environment])
			}
		}
	}

	get TOKEN() {
		return this.properties.TOKEN
	}
	get CLIENT_ID() {
		return this.properties.CLIENT_ID
	}
	get GUILD_ID() {
		return this.properties.GUILD_ID
	}
	get BOT_LOGS() {
		return this.properties.BOT_LOGS
	}
	get SUGGESTIONS() {
		return this.properties.SUGGESTIONS
	}
	get REPORTS() {
		return this.properties.REPORTS
	}
}
module.exports = Configuration
