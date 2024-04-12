const DiscordCommand = require('../../contracts/DiscordCommand')
const Discord = require('discord.js')
const DungeonsGenerator = require('../../apiweb/contracts/DungeonsGenerator')
const datacrunch = require('../../utils/datacrunch')

class Dungeons extends DiscordCommand {
	constructor(discord) {
		super()

		this.discord = discord

		this.data = {
			name: 'dungeons',
			description: 'Displays stats for dungeons',
			options: [
				{
					name: 'ign',
					description: 'Your minecraft username',
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

			this.discord.onBroadcastEmbed(this.onFormatDungeonsData(interaction, ign, profile, uuid, curr_profile, API), interaction)
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

			this.discord.onBroadcastEmbed(this.onFormatDungeonsData(interaction, ign, profile, uuid, curr_profile, API), interaction)
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

				this.discord.onBroadcastEmbed(this.onFormatDungeonsData(interaction, ign, profile, uuid, curr_profile, API), interaction)
			})
		})
	}

	onFormatDungeonsData(interaction, ign, profile, uuid, curr_profile, API) {
		const dungeon_data = DungeonsGenerator.execute(curr_profile)

		const dungeons_embed = new Discord.MessageEmbed()
		API.getPlayerHead(uuid, dungeons_embed)

		var catacombs = dungeon_data['types']['catacombs']
		var healer = dungeon_data['classes']['healer']
		var mage = dungeon_data['classes']['mage']
		var berserker = dungeon_data['classes']['berserk']
		var archer = dungeon_data['classes']['archer']
		var tank = dungeon_data['classes']['tank']

		dungeons_embed
			.setTitle(`★ __**Dungeons Overview for ${ign}**__ ★`)
			.setDescription(
				`
                            **Current Dungeon Class**: ${datacrunch.capitalizeFirstLetter(dungeon_data['selected_class'])}
                            **Total Dungeon Weight**: ${(Number(dungeon_data['weight'] || 0) + Number(dungeon_data['weight_overflow'] || 0)).toFixed(2)}
                            **Highest Completed Floor**: ${catacombs['highest_tier_completed'] || 0}
                            
                            <:Mort:873964017943720046> __**Catacombs**__
                            **Catacombs Level**: ${Math.trunc(catacombs['level'])}
                            **Total Catacombs Experience**: ${datacrunch.abbreviateNumber(catacombs['experience'] || 0)}
                            **Catacombs Weight**: ${(Number(catacombs['weight']) + Number(catacombs['weight_overflow'])).toFixed(2) || 0}
                            `
			)
			.addFields(
				{
					name: '__<a:Healer:873964024604295189> Healer__',
					value: `
                                **Class Level**: ${Math.trunc(healer['level'])}
                                **Class Experience**: ${datacrunch.abbreviateNumber(healer['experience'])}
                                **Class Weight**: ${(Number(healer['weight']) + Number(healer['weight_overflow'])).toFixed(2)}
                                `,
					inline: true,
				},
				{
					name: '__<a:Mage:873964022125445171> Mage__',
					value: `
                                **Class Level**: ${Math.trunc(mage['level'])}
                                **Class Experience**: ${datacrunch.abbreviateNumber(mage['experience'])}
                                **Class Weight**: ${(Number(mage['weight']) + Number(mage['weight_overflow'])).toFixed(2)}
                                `,
					inline: true,
				},
				{
					name: '__<a:Berserker:873964024503627816> Berserker__',
					value: `
                                **Class Level**: ${Math.trunc(berserker['level'])}
                                **Class Experience**: ${datacrunch.abbreviateNumber(berserker['experience'])}
                                **Class Weight**: ${(Number(berserker['weight']) + Number(berserker['weight_overflow'])).toFixed(2)}
                                `,
					inline: true,
				},
				{
					name: '__<a:Archer:873964024591704195> Archer__',
					value: `
                                **Class Level**: ${Math.trunc(archer['level'])}
                                **Class Experience**: ${datacrunch.abbreviateNumber(archer['experience'])}
                                **Class Weight**: ${(Number(archer['weight']) + Number(archer['weight_overflow'])).toFixed(2)}
                                `,
					inline: true,
				},
				{ name: '\u200B', value: '\u200B', inline: true },
				{
					name: '__<a:Tank:873964024520392804> Tank__',
					value: `
                                **Class Level**: ${Math.trunc(tank['level'])}
                                **Class Experience**: ${datacrunch.abbreviateNumber(tank['experience'])}
                                **Class Weight**: ${(Number(tank['weight']) + Number(tank['weight_overflow'])).toFixed(2)}
                                `,
					inline: true,
				}
			)
			.setFooter({ text: `Profile: ${profile}`, iconURL: interaction.client.user.displayAvatarURL() })
			.setTimestamp()

		return dungeons_embed
	}
}

module.exports = Dungeons
