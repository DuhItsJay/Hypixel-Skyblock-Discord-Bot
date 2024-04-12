const DiscordCommand = require('../../contracts/DiscordCommand')
const Discord = require('discord.js')
const SkillsGenerator = require('../../apiweb/contracts/SkillsGenerator')
const datacrunch = require('../../utils/datacrunch')

class Skills extends DiscordCommand {
	constructor(discord) {
		super()

		this.discord = discord

		this.data = {
			name: 'skills',
			description: 'Display stats for skills',
			options: [
				{
					name: 'ign',
					description: 'minecraft username',
					type: 3,
				},
				{
					name: 'profile',
					description: 'skyblock profile',
					type: 3,
				},
			],
		}
	}

	async onCommand(interaction) {
		const ign = interaction.options.get('ign')?.value
		const profile = interaction.options.get('profile')?.value
		const API = this.discord.getAPI()
		const redis = this.discord.redisGET()

		if (ign == undefined) return this.onGetSelfData(interaction, profile, API, redis)

		const uuid = await API.getUUID(ign)
		if (uuid == 'terminate') return this.discord.onBroadcastMessage('Make sure your IGN query is correct!', interaction)

		let curr_profile

		API.fetchRequest(uuid, interaction.user).then(async data => {
			if (profile == undefined) {
				const activeProfile = API.getActiveProfile(data.profiles, uuid)
				curr_profile = activeProfile.members[uuid]
			} else {
				curr_profile =
					data.profiles.findIndex(a => a.cute_name == profile) == -1
						? API.getActiveProfile(data.profiles, uuid).members[uuid]
						: data.profiles[data.profiles.findIndex(a => a.cute_name == profile)].members[uuid]
			}

			this.discord.onBroadcastEmbed(this.onFormatSkillsData(interaction, ign, profile, uuid, curr_profile, API), interaction)
		})
	}

	onGetSelfData(interaction, _profile, API, redis) {
		redis.GET(interaction.user.id + '_cache', (err, reply) => {
			if (reply == null) return this.onCreateData(interaction, API, redis)

			reply = JSON.parse(reply)

			const uuid = Object.keys(reply)[0]
			const userdata = reply[uuid]

			const ign = userdata.username
			const profile = _profile == undefined ? userdata.profile_name : _profile
			const data = reply[Object.keys(reply)[0]].skyblock_data

			let curr_profile

			if (profile == undefined) {
				const activeProfile = API.getActiveProfile(data.profiles, uuid)
				curr_profile = activeProfile.members[uuid]
			} else {
				curr_profile =
					data.profiles.findIndex(a => a.cute_name == profile) == -1
						? API.getActiveProfile(data.profiles, uuid).members[uuid]
						: data.profiles[data.profiles.findIndex(a => a.cute_name == profile)].members[uuid]
			}

			this.discord.onBroadcastEmbed(this.onFormatSkillsData(interaction, ign, profile, uuid, curr_profile, API), interaction)
		})
	}

	onCreateData(interaction, API, redis) {
		redis.GET(interaction.user.id, (err, reply) => {
			reply = JSON.parse(reply)

			if (reply == null)
				return this.discord.onBroadcastMessage(
					'You have not linked your account yet! Use /link to do that. Alternatively, you can use this command again with the ign.',
					interaction
				)

			const uuid = Object.keys(reply)[0]
			const userdata = reply[uuid]

			const ign = userdata.username
			const profile = userdata.profile_name

			let curr_profile

			API.fetchRequest(uuid, interaction.user).then(async data => {
				if (profile == undefined) {
					curr_profile = API.getActiveProfile(data.profiles, uuid)
				} else {
					curr_profile =
						data.profiles.findIndex(a => a.cute_name == profile) == -1
							? API.getActiveProfile(data.profiles, uuid)
							: data.profiles[data.profiles.findIndex(a => a.cute_name == profile)]
				}

				var profile_name = curr_profile.cute_name
				var profile_id = curr_profile.profile_id

				curr_profile = curr_profile.members[uuid]

				var json = {
					[uuid]: {
						username: ign,
						profile_name: profile_name,
						profile_id: profile_id,
						skyblock_data: data,
					},
				}

				redis.SET(interaction.user.id, JSON.stringify(json), (err, reply) => {
					this.discord.app.log.redis(`User saving ended with ${err} error(s).\nDB reply: ${reply}`)
				})
				redis.SETEX(interaction.user.id + `_cache`, 120, JSON.stringify(json), (err, reply) =>
					this.discord.app.log.redis(`User saving ended with ${err} error(s).\nDB reply: ${reply}`)
				)

				this.discord.onBroadcastEmbed(this.onFormatSkillsData(interaction, ign, profile, uuid, curr_profile, API), interaction)
			})
		})
	}

	onFormatSkillsData(interaction, ign, profile, uuid, curr_profile, API) {
		const skills_data = SkillsGenerator.execute(curr_profile)

		const skills_embed = new Discord.MessageEmbed().setThumbnail()
		API.getPlayerHead(uuid, skills_embed)

		var mining = skills_data['skills']['mining']
		var foraging = skills_data['skills']['foraging']
		var enchanting = skills_data['skills']['enchanting']
		var farming = skills_data['skills']['farming']
		var combat = skills_data['skills']['combat']
		var fishing = skills_data['skills']['fishing']
		var alchemy = skills_data['skills']['alchemy']
		var taming = skills_data['skills']['taming']

		skills_embed
			.setTitle(`★ __**Skill Overview for ${ign}**__ ★`)
			.setDescription(
				`
                  **Skill Average**: ${skills_data['skill_average'].toFixed(2)}
                  **Total Skill Weight**: ${(Number(skills_data['weight']) + Number(skills_data['weight_overflow'])).toFixed(2)}
                  `
			)
			.addFields(
				{
					name: '<:Alchemy:873964018153435206> __Alchemy__',
					value: `
                      **Skill Level**: ${Math.trunc(alchemy['level'])}
                      **Skill Experience**: ${datacrunch.abbreviateNumber(alchemy['experience'])}
                      **Skill Weight**: ${(Number(alchemy['weight']) + Number(alchemy['weight_overflow'])).toFixed(2)}
                      `,
					inline: true,
				},
				{
					name: '<:Combat:873964018203754556> __Combat__',
					value: `
                      **Skill Level**: ${Math.trunc(combat['level'])}
                      **Skill Experience**: ${datacrunch.abbreviateNumber(combat['experience'])}
                      **Skill Weight**: ${(Number(combat['weight']) + Number(combat['weight_overflow'])).toFixed(2)}
                      `,
					inline: true,
				},
				{
					name: '<:Enchanting:873964018291859518> __Enchanting__',
					value: `
                      **Skill Level**: ${Math.trunc(enchanting['level'])}
                      **Skill Experience**: ${datacrunch.abbreviateNumber(enchanting['experience'])}
                      **Skill Weight**: ${(Number(enchanting['weight']) + Number(enchanting['weight_overflow'])).toFixed(2)}
                      `,
					inline: true,
				},
				{
					name: '<:Farming:873964018107289660> __Farming__',
					value: `
                      **Skill Level**: ${Math.trunc(farming['level'])}
                      **Skill Experience**: ${datacrunch.abbreviateNumber(farming['experience'])}
                      **Skill Weight**: ${(Number(farming['weight']) + Number(farming['weight_overflow'])).toFixed(2)}
                      `,
					inline: true,
				},
				{
					name: '<:Fishing:873964017973092374> __Fishing__',
					value: `
                      **Skill Level**: ${Math.trunc(fishing['level'])}
                      **Skill Experience**: ${datacrunch.abbreviateNumber(fishing['experience'])}
                      **Skill Weight**: ${(Number(fishing['weight']) + Number(fishing['weight_overflow'])).toFixed(2)}
                      `,
					inline: true,
				},
				{
					name: '<:Foraging:873964018186977340> __Foraging__',
					value: `
                      **Skill Level**: ${Math.trunc(foraging['level'])}
                      **Skill Experience**: ${datacrunch.abbreviateNumber(foraging['experience'])}
                      **Skill Weight**: ${(Number(foraging['weight']) + Number(foraging['weight_overflow'])).toFixed(2)}
                      `,
					inline: true,
				},
				{
					name: '<:Mining:873964018333810758> __Mining__',
					value: `
                      **Skill Level**: ${Math.trunc(mining['level'])}
                      **Skill Experience**: ${datacrunch.abbreviateNumber(mining['experience'])}
                      **Skill Weight**: ${(Number(mining['weight']) + Number(mining['weight_overflow'])).toFixed(2)}
                      `,
					inline: true,
				},
				{ name: '\u200B', value: '\u200B', inline: true },
				{
					name: '<:Taming:873964018187010138> __Taming__',
					value: `
                      **Skill Level**: ${Math.trunc(taming['level'])}
                      **Skill Experience**: ${datacrunch.abbreviateNumber(taming['experience'])}
                      **Skill Weight**: ${(Number(taming['weight']) + Number(taming['weight_overflow'])).toFixed(2)}
                      `,
					inline: true,
				}
			)
			.setFooter({ text: `Profile: ${profile}`, iconURL: interaction.client.user.displayAvatarURL() })
			.setTimestamp()

		return skills_embed
	}
}

module.exports = Skills
