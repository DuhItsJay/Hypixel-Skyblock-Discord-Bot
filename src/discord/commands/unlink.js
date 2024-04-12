const DiscordCommand = require('../../contracts/DiscordCommand')

class Unlink extends DiscordCommand {
	constructor(discord) {
		super()

		this.discord = discord

		this.data = {
			name: 'unlink',
			description: 'unlink your account from the bot',
		}
	}

	onCommand(interaction) {
		const redis = this.discord.redisGET()

		redis.UNLINK(interaction.user.id, (err, reply) => {
			this.discord.app.log.redis(`User deletion ended with ${err} error(s).\nDB reply: ${reply}`)
		})

		this.discord.onBroadcastTitledEmbed(
			`Your account has been unlinked for the bot and any saved data has been purged.\n\u200B\nUse /link to link your account with the bot again!`,
			'<a:check:873964282801426522>' + ' Discord Account Successfully Unlinked ' + '<a:check:873964282801426522>',
			interaction
		)
	}
}

module.exports = Unlink
