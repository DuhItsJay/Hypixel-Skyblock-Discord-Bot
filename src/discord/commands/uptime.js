const DiscordCommand = require('../../contracts/DiscordCommand')
const { humanizeTime } = require('../../utils/time')

class Uptime extends DiscordCommand {
	constructor(discord) {
		super()

		this.discord = discord

		this.data = {
			name: 'uptime',
			description: 'shows the amount of time the bot has been online for.',
		}
	}

	onCommand(interaction) {
		this.discord.onBroadcastMessage(humanizeTime(this.discord.client.uptime / 1000), interaction)
	}
}

module.exports = Uptime
