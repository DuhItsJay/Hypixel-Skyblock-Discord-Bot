const DiscordCommand = require('../../contracts/DiscordCommand')
const Discord = require('discord.js')
const { humanizeTime } = require('../../utils/time')
const { abbreviateNumber, numberWithCommas, capitalizeFirstLetter } = require('../../utils/datacrunch')

class Bazaar extends DiscordCommand {
	constructor(discord) {
		super(discord)

		this.discord = discord

		this.data = {
			name: 'bazaar',
			description: 'Get the bazaar data for a specified item',
			options: [
				{
					name: 'item',
					description: 'name for the item you are looking for',
					type: 3,
					autocomplete: true,
					required: true,
				},
				{
					name: 'amount',
					description: 'the amount of items you want to buy/sell',
					type: 4,
					required: false,
				},
			],
		}
	}

	onCommand(interaction) {
		let id = interaction.options.get('item').value
		let amount = interaction.options.get('amount')?.value == undefined ? 1 : interaction.options.get('amount').value

		this.discord.redisGET().HMGET('bazaar', id, async (err, reply) => {
			if (reply == null) return this.discord.onBroadcastMessage(`There is no data for this item. Please try again later.`, interaction)

			reply = JSON.parse(reply)

			const embed = new Discord.MessageEmbed()
				.setTitle(reply.name)
				.setURL(`https://bazaartracker.com/product/${reply.id}`)
				.setDescription(`**Note**: Bazaar data is updated **~5** minutes.`)
				.setColor('9A48BB')
				.setFields(
					{
						name: `Buy Instantly (${amount})`,
						value: numberWithCommas((Number(reply.buyPrice) * amount).toFixed(1)),
						inline: true,
					},
					{ name: '\u200B', value: '\u200B', inline: true },
					{
						name: `Sell Instantly (${amount})`,
						value: numberWithCommas((Number(reply.sellPrice) * amount).toFixed(1)),
						inline: true,
					},
					{ name: 'Buy Volume', value: numberWithCommas(Number(reply.buyVolume)), inline: true },
					{ name: '\u200B', value: '\u200B', inline: true },
					{ name: 'Sell Volume', value: numberWithCommas(Number(reply.sellVolume)), inline: true }
				)
				.setFooter({ text: 'Much love to Nariah!' })
				.setTimestamp()
				.setThumbnail('https://cdn.discordapp.com/attachments/884600031779377179/937193165197283418/auto_recombobulator_1.gif')

			this.discord.onBroadcastEmbed(embed, interaction)
		})
	}

	async onAutocomplete(interaction) {
		const client = this.discord.redisGET()
		const item = interaction.options._hoistedOptions[0].value
		const response = []

		if (!item) {
			client.HSCAN('bazaar', 0, 'COUNT', 24, (err, reply) => {
				for (var i = 0; i < reply[1].length; i += 2) {
					const field = reply[1][i]

					let name = []
					field
						.toLowerCase()
						.split('_')
						.forEach(word => name.push(capitalizeFirstLetter(word)))

					response.push({
						name: name.join(' '),
						value: field.toString(),
					})
				}

				interaction.respond(response)
			})
		} else {
			client.HSCAN('bazaar', 0, 'MATCH', `*${item.toUpperCase()}*`, 'COUNT', 10000, (err, reply) => {
				for (var i = 0; i < reply[1].length; i += 2) {
					const field = reply[1][i]

					let name = []
					field
						.toLowerCase()
						.split('_')
						.forEach(word => name.push(capitalizeFirstLetter(word)))

					response.push({
						name: name.join(' '),
						value: field.toString(),
					})
				}

				interaction.respond(response.slice(0, 25))
			})
		}
	}
}

module.exports = Bazaar
