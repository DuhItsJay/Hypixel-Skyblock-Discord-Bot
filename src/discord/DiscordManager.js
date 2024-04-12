const CommunicationBridge = require('../contracts/CommunicationBridge')
const StateHandler = require('./handlers/StateHandler')

const ServerHandler = require('./ServerHandler')
const CommandHandler = require('./CommandHandler')
const MessageHandler = require('./handlers/MessageHandler')

const Discord = require('discord.js')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const fs = require('fs')

class DiscordManager extends CommunicationBridge {
	constructor(app) {
		super()

		this.app = app

		this.StateHandler = new StateHandler(this)
		this.MessageHandler = new MessageHandler(this, new CommandHandler(this))
		this.ServerHandler = new ServerHandler(this)
	}

	connect() {
		const Intents = Discord.Intents.FLAGS

		this.client = new Discord.Client({
			intents: [Intents.GUILDS, Intents.GUILD_MEMBERS, Intents.GUILD_PRESENCES, Intents.GUILD_MESSAGES, Intents.GUILD_MESSAGE_TYPING],
		})

		this.registerSlashCommands()
		this.client.on('ready', async () => {
			this.StateHandler.onReady()
			await this.updateSlashPermissions()
			this.listeners()
		})
		this.client.login(this.app.config.TOKEN).catch(error => {
			this.app.log.error(error)

			process.exit(1)
		})

		process.on('SIGINT', () => this.StateHandler.onClose())
	}

	registerSlashCommands() {
		const commands = []
		const commandFiles = fs.readdirSync('./src/discord/commands').filter(file => file.endsWith('.js'))

		for (const file of commandFiles) {
			const command = new (require(`./commands/${file}`))(this)
			commands.push(command.data)
		}

		const rest = new REST({ version: '9' }).setToken(this.app.config.TOKEN)

		;(async () => {
			try {
				this.app.log.discord('Started refreshing application (/) commands.')
				await rest.put(Routes.applicationGuildCommands(this.app.config.CLIENT_ID, this.app.config.GUILD_ID), { body: commands })
				this.app.log.discord('Successfully reloaded application (/) commands.')
			} catch (error) {
				this.app.log.error(error)
			}
		})()
	}

	async updateSlashPermissions() {
		const guild = this.client.guilds.cache.get(this.app.config.GUILD_ID)
		const commands = await guild?.commands.fetch()

		commands.forEach(command => {
			if (command.defaultPermission) return

			command.permissions.set({
				permissions: [{ id: this.ServerHandler.MemberHandler.properties.STAFF_TEAM.ADMIN, type: 'ROLE', permission: true }],
			})
		})
	}

	listeners() {
		//Client Listeners
		this.client.on('error', e => this.StateHandler.onError(e))
		this.MessageHandler.registerEvents(this.client)

		//Ticket Listeners
		this.ServerHandler.connect()
	}

	onBroadcastMessage(message, interaction) {
		interaction.reply({
			embeds: [
				{
					author: { name: message },
					color: '9A48BB',
				},
			],
		})
	}

	onBroadcastComponents(message, interaction, components) {
		interaction.reply({
			embeds: [
				{
					author: { name: message },
					color: '9A48BB',
				},
			],
			components: [components],
		})
	}

	onBroadcastTitledEmbed(message, title, interaction) {
		interaction.reply({
			embeds: [
				{
					title: title,
					description: message,
					color: '9A48BB',
				},
			],
		})
	}

	onBroadcastEmbed(embed_col, interaction) {
		if (this.API.reserve) {
			return interaction.reply({
				embeds: [
					embed_col,
					{
						description: `The bot is in reserve mode, therefore the sent data will not be accurate to current time. Please contact a staff for more information.`,
						color: 'YELLOW',
					},
				],
			})
		}
		interaction.reply({ embeds: [embed_col] })
	}

	onNewMember(member, reply) {
		const GuestRole = member.guild.roles.cache.findKey(role => role.id === '884600030730797150')
		const verified = member.guild.roles.cache.findKey(role => role.id === '884600030688845860')

		if (reply != null) {
			member.roles.add(GuestRole)
			member.roles.add(verified)
		} else {
			member.roles.add(GuestRole)
		}
	}

	//embed structure
}

module.exports = DiscordManager
