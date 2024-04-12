const DiscordCommand = require('../../contracts/DiscordCommand')
const Discord = require('discord.js')
const { humanizeTime } = require('../../utils/time')
const { abbreviateNumber, numberWithCommas, capitalizeFirstLetter } = require('../../utils/datacrunch')

const { findProfits } = require('../../apiweb/contracts/ForgeGenerator')

class ForgeProfits extends DiscordCommand {
	constructor(discord) {
		super(discord)

		this.discord = discord

		this.data = {
			name: 'forgeprofits',
			description: 'Profits you can gain from forging items',
		}
	}

	onCommand(interaction) {
		findProfits(this.discord.redisGET(), interaction)
	}
}

module.exports = ForgeProfits
