const Discord = require('discord.js')
const time = require('../../utils/time')

class MemberHandler {
	ROLES = {
		STAFF_TEAM: { STAFF: '884600030747562032', ADMIN: '884600030747562031' },
		HYPIXEL_RANKS: { NO_RANK: null, VIP: null, 'VIP+': null, MVP: null, 'MVP+': null, 'MVP++': null },
		SKYBLOCK: {
			DUNGEON: { HEALER: null, MAGE: null, BERSERKER: null, ARCHER: null, TANK: null },
			SLAYERS: { MAX_REV: null, MAX_TARA: null, MAX_SVEN: null, MAX_EMAN: null },
			SKILLS: {
				ALCHEMY: {
					LVL10: null,
					LVL25: null,
					LVL50: null,
				},
				COMBAT: {
					LVL10: null,
					LVL25: null,
					LVL50: null,
					LVL60: null,
				},
				ENCHANTING: {
					LVL10: null,
					LVL25: null,
					LVL50: null,
					LVL60: null,
				},
				FARMING: {
					LVL10: null,
					LVL25: null,
					LVL50: null,
					LVL60: null,
				},
				FISHING: {
					LVL10: null,
					LVL25: null,
					LVL50: null,
				},
				FORAGING: {
					LVL10: null,
					LVL25: null,
					LVL50: null,
				},
				MINING: {
					LVL10: null,
					LVL25: null,
					LVL50: null,
					LVL60: null,
				},
				TAMING: {
					LVL10: null,
					LVL25: null,
					LVL50: null,
				},
				CATACOMBS: {
					LVL10: null,
					LVL20: null,
					LVL30: null,
					LVL40: null,
					LVL50: null,
				},
			},
		},
		VERIFIED: null,
		GUEST: null,
		WAITING_LIST: null,
	}

	constructor(discord) {
		this.discord = discord
	}

	get properties() {
		return this.ROLES
	}

	registerEvents() {
		this.discord.client.on('guildMemberRemove', member => this.onLeave(member))
		this.discord.client.on('guildMemberAdd', member => this.onJoin(member))
	}

	onJoin(member) {
		this.discord.client.channels.fetch(this.discord.ServerHandler.ChannelHandler.properties.MODERATION.replace(/[^0-9]/g, '')).then(channel => {
			channel.send({
				embeds: [
					{
						color: '47F049',
						author: {
							name: 'Member Joined',
							icon_url: member.user.displayAvatarURL(),
						},
						description: `<@${member.id}> ${member.user.tag}`,
						thumbnail: {
							url: member.user.displayAvatarURL(),
						},
						fields: [
							{
								name: '**Account Age**',
								value: time.dateDiff(Date.now(), member.user.createdAt),
							},
						],
						footer: {
							text: `ID: ${member.id}`,
						},
						timestamp: new Date(),
					},
				],
			})
			member.roles.add(this.properties.GUEST)
			this.discord.redisGET().GET(member.id, (err, reply) => {
				if (reply != null) return member.roles.add(this.properties.VERIFIED)
			})
		})
	}

	onLeave(member) {
		this.discord.client.channels.fetch(this.discord.ServerHandler.ChannelHandler.properties.MODERATION.replace(/[^0-9]/g, '')).then(channel => {
			channel.send({
				embeds: [
					{
						color: 'F04947',
						author: {
							name: 'Member Left',
							icon_url: member.user.displayAvatarURL(),
						},
						description: `<@${member.id}> ${member.user.tag}`,
						thumbnail: {
							url: member.user.displayAvatarURL(),
						},
						fields: [
							{
								name: '**Roles**',
								value: `${
									member.roles.cache.filter(roles => roles.id !== member.guild.id).size == 0
										? 'none'
										: member.roles.cache.filter(roles => roles.id !== member.guild.id).map(r => r.toString())
								}`,
							},
						],
						footer: {
							text: `ID: ${member.id}`,
						},
						timestamp: new Date(),
					},
				],
			})
		})
	}
}

module.exports = MemberHandler
