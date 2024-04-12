const Discord = require('discord.js')
const { stripIndent } = require('common-tags')

class ChannelHandler {
	LOGS = {
		MODERATION: null,
		WAITING_LIST: null,
		GUILD_COUNT: null,
		SKYBLOCK_DATE: null,
		SKYBLOCK_EVENTS: null,
		LEADERBOARD_RANK: null,
		FETCHUR: null,
		FARMING_CONTESTS: null,
	}

	environmentOverrides = {
		MODERATION: val => (this.LOGS.MODERATION = val),
		WAITING_LIST: val => (this.LOGS.WAITING_LIST = val),
		GUILD_COUNT: val => (this.LOGS.GUILD_COUNT = val),
		SKYBLOCK_DATE: val => (this.LOGS.SKYBLOCK_DATE = val),
		SKYBLOCK_EVENTS: val => (this.LOGS.SKYBLOCK_EVENTS = val),
		LEADERBOARD_RANK: val => (this.LOGS.LEADERBOARD_RANK = val),
		FETCHUR: val => (this.LOGS.FETCHUR = val),
		FARMING_CONTESTS: val => (this.LOGS.FARMING_CONTESTS = val = val),
	}

	get properties() {
		return this.LOGS
	}

	constructor(discord) {
		this.discord = discord
	}

	registerEvents() {
		this.discord.redisGET().GET('LOGS', (err, reply) => {
			if (reply != null) {
				reply = JSON.parse(reply)

				this.LOGS = reply
			}

			for (let environment of Object.keys(process.env)) {
				if (this.environmentOverrides.hasOwnProperty(environment)) {
					this.environmentOverrides[environment](process.env[environment])
				}
			}

			this.discord.redisGET().SET('LOGS', JSON.stringify(this.LOGS), (err, reply) => this.onConfigureChannels(err, reply, this.LOGS))
		})
	}

	onConfigureChannels(err, reply, json) {
		const list = []
		Object.keys(json).forEach(item => list.push(json[item] == null ? 'Not Set' : json[item]))

		this.discord.app.log.discord(stripIndent`\n
		----------------------------------------
		Log Channel Configuration Load Complete
		Errors: ${err}
		
		Current CONFIG
		MODERATION: ${list[0]}
		WAITING_LIST: ${list[1]}
		GUILD_COUNT: ${list[2]}
		SKYBLOCK_DATE: ${list[3]}
		SKYBLOCK_EVENTS: ${list[4]}
		LEADERBOARD_RANK: ${list[5]}
		FETCHUR: ${list[6]}
		FARMING_CONTESTS: ${list[7]}
		----------------------------------------`)
	}

	onChange(type, value, interaction) {
		let currVal = this.LOGS[type]

		this.LOGS[type] = value

		this.discord.redisGET().SET('LOGS', JSON.stringify(this.LOGS), (err, reply) => {
			if (err == null) this.discord.onBroadcastTitledEmbed(`Changed value \`${type}\`:  ${currVal} ➡️ ${value}`, 'Change Successful', interaction)
			else {
				this.discord.onBroadcastMessage(`An error occurred!`, interaction)
			}
		})
	}
}

module.exports = ChannelHandler
