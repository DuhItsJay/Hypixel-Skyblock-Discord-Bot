const DiscordCommand = require('../../contracts/DiscordCommand')
const datacrunch = require('../../utils/datacrunch')
const { humanizeTime } = require('../../utils/time')

const { version } = require('../../../package.json')

class Settings extends DiscordCommand {
	constructor(discord) {
		super()

		this.discord = discord

		this.data = {
			name: 'settings',
			description: 'view/change current settings for the bot',
			default_permission: false,
			options: [
				{
					name: 'view',
					description: 'view the current settings',
					type: 1,
				},
				{
					name: 'change',
					description: 'change the bot settings',
					type: 1,
					options: [
						{
							name: 'category',
							description: 'the category that you want to be changed',
							type: 3,
							required: true,
							choices: [
								{ name: 'API settings', value: 'API' },
								{ name: 'Cosmetic Channels', value: 'LOGS' },
								{ name: 'Guild Requirements', value: 'GUILD' },
								{ name: 'Ticket System Channels', value: 'CHANNELS' },
							],
						},
						{ name: 'id', description: 'id of the key that you want to change', type: 3, required: true, autocomplete: true },
						{ name: 'value', description: 'value of the key you want changed', type: 3, required: true, autocomplete: true },
					],
				},
			],
		}
	}

	onCommand(interaction) {
		const CATEGORY = interaction.options._hoistedOptions[0]?.value
		const ID = interaction.options._hoistedOptions[1]?.value
		const VALUE = interaction.options._hoistedOptions[2]?.value

		this.API = this.discord.API.StateHandler
		this.CHANNELS = this.discord.ServerHandler.TicketSystem
		this.LOGS = this.discord.ServerHandler.ChannelHandler
		this.GUILD = this.discord.ServerHandler.GuildHandler

		const command = interaction.options._subcommand
		const settings = {
			API: [],
			CHANNELS: [],
			LOGS: [],
			GUILD: [],
		}

		Object.keys(settings).forEach(key => {
			Object.keys(this[key].properties).forEach(item =>
				settings[key].push(`\`${item}\`: ${this[key].properties[item] == null ? 'Not Set' : this[key].properties[item]}`)
			)
		})

		if (command == 'view') {
			this.discord.onBroadcastEmbed(
				{
					title: 'Current Settings',
					description: 'The /settings change command will provide with options when necessary',
					fields: [
						{
							name: 'API Key Status',
							value: `API Keys: ${settings.API.length}`,
						},
						{
							name: 'Ticket System Channels',
							value: settings.CHANNELS.join('\n'),
						},
						{
							name: 'Logging & Cosmetic Channels',
							value: settings.LOGS.join('\n'),
						},
						{
							name: 'Guild Requirements',
							value: settings.GUILD.join('\n'),
						},
						{
							name: `Info`,
							value: [
								`User: <@${this.discord.client.user.id}>`,
								`Uptime: \`${humanizeTime(this.discord.client.uptime / 1000)}\``,
								`Version: \`${version}\``,
							].join('\n'),
						},
					],
					color: '9A48BB',
					footer: {
						text: 'Made by DuhItsJay ❤	',
					},
					timestamp: new Date(),
				},
				interaction
			)
		}

		if (command == 'change') {
			this[CATEGORY].onChange(ID, VALUE, interaction)
		}
	}

	onAutocomplete(interaction) {
		const CATEGORY = interaction.options._hoistedOptions[0].value
		const response = []

		this.API = this.discord.API.StateHandler.properties
		this.CHANNELS = this.discord.ServerHandler.TicketSystem.properties
		this.LOGS = this.discord.ServerHandler.ChannelHandler.properties
		this.GUILD = this.discord.ServerHandler.GuildHandler.properties

		if (interaction.options._hoistedOptions[1].value) {
			const ID = interaction.options._hoistedOptions[1].value

			if (CATEGORY == 'API' || CATEGORY == 'GUILD') return
			else {
				interaction.member.guild.channels.cache.forEach(channel => {
					response.push({
						name: channel.name,
						value: `<#${channel.id}>`,
					})
				})
			}
		} else {
			const keys = Object.keys(this[CATEGORY])

			keys.forEach(key => {
				let name = []
				key
					.toLowerCase()
					.split('_')
					.forEach(word => name.push(datacrunch.capitalizeFirstLetter(word)))

				response.push({
					name: name.join(' '),
					value: key.toString(),
				})
			})
		}
		interaction.respond(response.slice(0, 25))
	}
}

module.exports = Settings
