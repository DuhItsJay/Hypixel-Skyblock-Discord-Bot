const Discord = require('discord.js')
const { stripIndent } = require('common-tags')
const axios = require('axios')

const DungeonsGenerator = require('../../apiweb/contracts/DungeonsGenerator')
const SlayersGenerator = require('../../apiweb/contracts/SlayersGenerator')
const SkillsGenerator = require('../../apiweb/contracts/SkillsGenerator')

class GuildHandler {
	GUILD = {
		NAME: null,
		ID: null,
		RANKS: {},
		REQUIREMENTS: {
			WEIGHT: 0,
			SLAYER_XP: 0,
			SKILL_AVG: 0,
			CATACOMBS: 0,
		},
		MEMBERS: {},
		STATS: {
			MEMBER_COUNT: 0,
			AVG_WEIGHT: 0,
			AVG_SKILL: 0,
			AVG_SLAYER_XP: 0,
			AVG_CATACOMBS_LVL: 0,
			LEADERBOARD_RANK: 0,
		},
		RAW: {},
	}

	environmentOverrides = {
		NAME: val => (this.GUILD.NAME = val),
		ID: val => (this.GUILD.ID = val),
		RANKS: val => (this.GUILD.RANKS = val),
		WEIGHT: val => (this.GUILD.REQUIREMENTS.WEIGHT = val),
		SLAYER_XP: val => (this.GUILD.REQUIREMENTS.SLAYER_XP = val),
		SKILL_AVG: val => (this.GUILD.REQUIREMENTS.SKILL_AVG = val),
		CATACOMBS: val => (this.GUILD.REQUIREMENTS.CATACOMBS = val),
		MEMBERS: val => (this.GUILD.MEMBERS = val),
		MEMBER_COUNT: val => (this.GUILD.STATS.MEMBER_COUNT = val),
		AVG_WEIGHT: val => (this.GUILD.STATS.AVG_WEIGHT = val),
		AVG_SKILL: val => (this.GUILD.STATS.AVG_SKILL = val),
		AVG_SLAYER_XP: val => (this.GUILD.STATS.AVG_SLAYER_XP = val),
		AVG_CATACOMBS_LVL: val => (this.GUILD.STATS.AVG_CATACOMBS_LVL = val),
		LEADERBOARD_RANK: val => (this.GUILD.STATS.LEADERBOARD_RANK = val),
		RAW: val => (this.GUILD.RAW = val),
	}

	get properties() {
		return this.GUILD.REQUIREMENTS
	}

	constructor(discord) {
		this.discord = discord
	}

	registerEvents() {
		this.discord.redisGET().GET('GUILD', (err, reply) => {
			if (reply != null) {
				reply = JSON.parse(reply)

				this.GUILD = reply
			}

			for (let environment of Object.keys(process.env)) {
				if (this.environmentOverrides.hasOwnProperty(environment)) {
					this.environmentOverrides[environment](process.env[environment])
				}
			}

			this.discord.redisGET().SET('GUILD', JSON.stringify(this.GUILD), (err, reply) => this.onConfigureChannels(err, reply, this.GUILD))
		})
	}

	onConfigureChannels(err, reply, json) {
		this.discord.app.log.discord(stripIndent`\n
		----------------------------------------
		Guild Configuration Load Complete
		Errors: ${err}
		
		Current CONFIG
		Guild Name: ${this.GUILD.NAME || 'Not Set'}
		Guild ID: ${this.GUILD.ID || 'Not Set'}
		MEMBER_COUNT: ${this.GUILD.STATS.MEMBER_COUNT || 0}
		AVG_WEIGHT: ${this.GUILD.STATS.AVG_WEIGHT || 0}
		AVG_SKILL: ${this.GUILD.STATS.AVG_SKILL || 0}
		AVG_SLAYER_XP: ${this.GUILD.STATS.AVG_SLAYER_XP || 0}
		AVG_CATACOMBS_LVL: ${this.GUILD.STATS.AVG_CATACOMBS_LVL || 0}
		LEADERBOARD_RANK: ${this.GUILD.STATS.LEADERBOARD_RANK || 'None'}
		----------------------------------------`)
	}

	onChange(type, value, interaction) {
		let currVal = this.GUILD.REQUIREMENTS[type]

		this.GUILD.REQUIREMENTS[type] = value

		this.discord.redisGET().SET('GUILD', JSON.stringify(this.GUILD), (err, reply) => {
			if (err == null) this.discord.onBroadcastTitledEmbed(`Changed value \`${type}\`:  ${currVal} ➡️ ${value}`, 'Change Successful', interaction)
			else {
				this.discord.onBroadcastMessage(`An error occurred!`, interaction)
			}
		})
	}
}

module.exports = GuildHandler
