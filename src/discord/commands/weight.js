const DiscordCommand = require('../../contracts/DiscordCommand')
const Discord = require('discord.js')
const DungeonsGenerator = require('../../apiweb/contracts/DungeonsGenerator')
const SlayersGenerator = require('../../apiweb/contracts/SlayersGenerator')
const SkillsGenerator = require('../../apiweb/contracts/SkillsGenerator')

class Weight extends DiscordCommand {
	constructor(discord) {
		super()

		this.discord = discord

		this.data = {
			name: 'weight',
			description: 'Senither weight for your skyblock profile',
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

			this.discord.onBroadcastEmbed(this.onFormatWeightData(interaction, ign, profile, uuid, curr_profile, API), interaction)
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

			this.discord.onBroadcastEmbed(this.onFormatWeightData(interaction, ign, profile, uuid, curr_profile, API), interaction)
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

				this.discord.onBroadcastEmbed(this.onFormatWeightData(interaction, ign, profile, uuid, curr_profile, API), interaction)
			})
		})
	}

	onFormatWeightData(interaction, ign, profile, uuid, curr_profile, API) {
		const dungeon_data = DungeonsGenerator.execute(curr_profile)
		const skills_data = SkillsGenerator.execute(curr_profile)
		const slayer_data = SlayersGenerator.execute(curr_profile)

		const weight_embed = new Discord.MessageEmbed()
		API.getPlayerHead(uuid, weight_embed)

		var skill = (Number(skills_data['weight']) + Number(skills_data['weight_overflow'])).toFixed(2)
		var slayer = (Number(slayer_data['weight']) + Number(slayer_data['weight_overflow'])).toFixed(2)
		var dungeon = (Number(dungeon_data['weight']) + Number(dungeon_data['weight_overflow'])).toFixed(2)

		var total_weight = parseInt(skill) + parseInt(slayer) + parseInt(dungeon)

		weight_embed
			.setTitle(`★ __**Skyblock Weight for ${ign}**__ ★`)
			.setDescription(`**Total Profile Weight**: ${total_weight}`)
			.addFields(
				{ name: '__**Skill**__', value: skill, inline: true },
				{ name: '__**Slayer**__', value: slayer, inline: true },
				{ name: '__**Dungeon**__', value: dungeon, inline: true }
			)
			.setFooter({ text: `Profile: ${profile}`, iconURL: interaction.client.user.displayAvatarURL() })
			.setTimestamp()

		const weight_req = this.discord.ServerHandler.GuildHandler.properties.WEIGHT

		if (total_weight >= weight_req) {
			weight_embed.addField(
				'\u200B',

				`<a:check:873964282801426522> You meet the guild requirements of ${weight_req} weight!`
			)
		} else {
			weight_embed.addField(
				'\u200B',

				`<a:animated_x:873964283174723624> You do not meet the guild requirements of ${weight_req} weight!`
			)
		}

		return weight_embed
	}
}

module.exports = Weight
