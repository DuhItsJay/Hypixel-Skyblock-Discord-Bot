const DiscordCommand = require('../../contracts/DiscordCommand')
const Discord = require('discord.js')
const SlayersGenerator = require('../../apiweb/contracts/SlayersGenerator')
const datacrunch = require('../../utils/datacrunch')

class Slayers extends DiscordCommand {
	constructor(discord) {
		super()

		this.discord = discord

		this.data = {
			name: 'slayers',
			description: 'Display stats for slayers',
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
		const slayer_data = SlayersGenerator.execute(curr_profile)

		const slayer_embed = new Discord.MessageEmbed()
		API.getPlayerHead(uuid, slayer_embed)

		var zombie = slayer_data['bosses']['zombie']
		var spider = slayer_data['bosses']['spider']
		var wolf = slayer_data['bosses']['wolf']
		var enderman = slayer_data['bosses']['enderman']

		slayer_embed
			.setTitle(`★ __**Slayer Overview for ${ign}**__ ★`)
			.setDescription(
				`
                              **Total Coins Spent**: ${datacrunch.abbreviateNumber(slayer_data['total_coins_spent'])}
                              **Total Slayer Experience**: ${datacrunch.abbreviateNumber(slayer_data['total_experience'])}
                              **Total Slayer Weight**: ${(Number(slayer_data['weight']) + Number(slayer_data['weight_overflow'])).toFixed(2)}
                              `
			)
			.addFields(
				{
					name: '__<:Revenant_Horror:873964190606446612> Revenant Horror__',
					value: `
                                **Slayer Level**: ${Math.trunc(zombie['level'])}
                                **Slayer Experience**: ${datacrunch.abbreviateNumber(zombie['experience'])}
                                **Slayer Weight**: ${(Number(zombie['weight']) + Number(zombie['weight_overflow'])).toFixed(2)}
                                `,
					inline: true,
				},
				{ name: '\u200B', value: '\u200B', inline: true },
				{
					name: '__<:Tarantula_Broodfather:873964190065373224> Tarantula Broodfather__',
					value: `
                                **Slayer Level**: ${Math.trunc(spider['level'])}
                                **Slayer Experience**: ${datacrunch.abbreviateNumber(spider['experience'])}
                                **Slayer Weight**: ${(Number(spider['weight']) + Number(spider['weight_overflow'])).toFixed(2)}
                                `,
					inline: true,
				},
				{
					name: '__<:Sven_Packmaster:873964190405124168> Sven Packmaster__',
					value: `
                                **Slayer Level**: ${Math.trunc(wolf['level'])}
                                **Slayer Experience**: ${datacrunch.abbreviateNumber(wolf['experience'])}
                                **Slayer Weight**: ${(Number(wolf['weight']) + Number(wolf['weight_overflow'])).toFixed(2)}
                                `,
					inline: true,
				},
				{ name: '\u200B', value: '\u200B', inline: true },
				{
					name: '__<:Voidgloom_Seraph:873964190581284935> Voidgloom Seraph__',
					value: `
                                **Slayer Level**: ${Math.trunc(enderman['level'])}
                                **Slayer Experience**: ${datacrunch.abbreviateNumber(enderman['experience'])}
                                **Slayer Weight**: ${(Number(enderman['weight']) + Number(enderman['weight_overflow'])).toFixed(2)}
                                `,
					inline: true,
				}
			)
			.setFooter({ text: `Profile: ${profile}`, iconURL: interaction.client.user.displayAvatarURL() })
			.setTimestamp()

		return slayer_embed
	}
}

module.exports = Slayers
