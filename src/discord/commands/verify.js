const DiscordCommand = require('../../contracts/DiscordCommand')
const Discord = require('discord.js')
const datacrunch = require('../../utils/datacrunch')

class Link extends DiscordCommand {
	constructor(discord) {
		super()

		this.discord = discord

		this.data = {
			name: 'verify',
			description: 'Verify your account to use commands without having to type your IGN',
			options: [
				{
					name: 'ign',
					description: 'Your minecraft username',
					type: 3,
					required: true,
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

		const uuid = await API.getUUID(ign)

		if (uuid == 'terminate') return this.discord.onBroadcastMessage('Make sure your IGN query is correct!', interaction)
		if (datacrunch.recordsCheck(uuid))
			return this.discord.onBroadcastMessage(
				'Since this account has either been banned from joining the guild or is a reported scammer, you will not be able to verify it. If you feel this is a mistake, please contact a staff member.',
				interaction
			)

		redis.GET(interaction.user.id, async (err, reply) => {
			if (reply != null) return this.onUpdateLink(interaction, ign, profile, uuid, API, redis)

			const data = await API.getPlayerProfile(uuid)
			const tag = data.socialMedia?.links?.DISCORD ? data.socialMedia.links.DISCORD : false

			if (this.onCheckMismatch(ign, tag, interaction)) return this.onStartSave(interaction, ign, profile, uuid, API, redis)
		})
	}

	onUpdateLink(interaction, ign, profile, uuid, API, redis) {
		const actionrow = new Discord.MessageActionRow().addComponents(
			new Discord.MessageButton().setLabel('Yes').setCustomId('true').setStyle('SUCCESS'),
			new Discord.MessageButton().setLabel('No').setCustomId('false').setStyle('DANGER')
		)

		const timeout = new Discord.MessageActionRow().addComponents(
			new Discord.MessageButton().setLabel('Request Timeout').setStyle('DANGER').setCustomId('timeout').setDisabled()
		)

		this.discord.onBroadcastComponents('This account has already been linked. Would you like you update your settings?', interaction, actionrow)
		interaction.fetchReply().then(reply => {
			const collector = reply.createMessageComponentCollector(c => c.user.id == interaction.user.id && c.channel.id == reply.channelId, { max: 1 })

			collector.on('collect', async collected => {
				reply.edit({
					embeds: [
						{
							author: { name: 'This account has already been linked. Would you like you update your settings?' },
							color: '9A48BB',
						},
					],
					components: [timeout],
				})

				if (collected.customId == 'false') {
					return collected.deferUpdate()
				} else {
					const data = await API.getPlayerProfile(uuid)
					const tag = data.socialMedia?.links?.DISCORD ? data.socialMedia.links.DISCORD : false

					if (this.onCheckMismatch(ign, tag, collected)) return this.onStartSave(collected, ign, profile, uuid, API, redis)
				}
			})
		})
	}

	onCheckMismatch(ign, tag, interaction) {
		if (!tag && this.discord.API.reserve) {
			this.discord.onBroadcastTitledEmbed(
				`The bot is currently on reserve mode. This means only linked users can access hypixel data.\n\u200B\n__If you see this message, please ping a staff as soon as possible__`,
				'**API Requests Throttled**'
			)
		}
		if (!tag) {
			this.discord.onBroadcastTitledEmbed(
				`You have not linked your discord account with Hypixel D:\n\u200B\n**If you are struggling, use this [guide](https://www.youtube.com/watch?v=gqUPbkxxKLI) for help!**`,
				'**Discord Accound Link Not Found**',
				interaction
			)

			return false
		}

		if (tag != interaction.user.tag) {
			this.discord.onBroadcastTitledEmbed(
				`\`${ign}\`'s set Discord is [\`${tag}\`] which does not match your tag [\`${interaction.user.tag}\`]\n\u200B\n**If you are struggling, use this [guide](https://www.youtube.com/watch?v=gqUPbkxxKLI) for help!**`,
				`<a:xxx:873964283174723624> Tag Mismatch <a:xxx:873964283174723624>`,
				interaction
			)

			return false
		}

		return true
	}

	onStartSave(interaction, ign, profile, uuid, API, redis) {
		let curr_profile

		API.fetchRequest(uuid).then(async data => {
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

			this.discord.onBroadcastTitledEmbed(
				`Your hypixel account was succesfully linked with [${'`' + interaction.user.tag + '`'}]\n\u200B\nProfile default set to ${
					'`' + profile_name + '`'
				}. Use /link again to change your profile`,
				'<a:check:873964282801426522>' + ' Discord Account Successfully Linked ' + '<a:check:873964282801426522>',
				interaction
			)

			var json = {
				[uuid]: {
					username: ign,
					profile_name: profile_name,
					profile_id: profile_id,
					skyblock_data: data,
				},
			}

			//interaction.member.roles.add(this.discord.ServerHandler.MemberHandler.properties.VERIFIED)

			redis.SET(interaction.user.id, JSON.stringify(json), (err, reply) => {
				this.discord.app.log.redis(`User saving ended with ${err} error(s).\nDB reply: ${reply}`)

				//member manager role adds from hypixel data compile and in-discord roles
			})
			redis.SETEX(interaction.user.id + `_cache`, 120, JSON.stringify(json), (err, reply) =>
				this.discord.app.log.redis(`User saving ended with ${err} error(s).\nDB reply: ${reply}`)
			)
		})
	}
}

module.exports = Link
