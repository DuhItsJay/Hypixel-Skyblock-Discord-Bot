const fs = require('fs')
const { Collection } = require('discord.js')

class CommandHandler {
	constructor(discord) {
		this.discord = discord

		this.commands = new Collection()
		const commandFiles = fs.readdirSync('./src/discord/commands').filter(file => file.endsWith('.js'))
		for (const file of commandFiles) {
			const command = new (require(`./commands/${file}`))(discord)
			this.commands.set(command.data.name, command)
		}
	}

	async handle(interaction) {
		if (interaction.author) return

		const command = this.commands.get(interaction.commandName)
		if (!command) return
		if (interaction.isCommand()) this.discord.app.log.discord(`[${interaction.commandName}] ${interaction.user}`)

		try {
			if (interaction.isCommand()) await command.onCommand(interaction)
			if (interaction.isAutocomplete()) await command.onAutocomplete(interaction)
		} catch (error) {
			console.error(error)
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
		}

		return true
	}
}

module.exports = CommandHandler
