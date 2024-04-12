const DiscordCommand = require('../../contracts/DiscordCommand')
const Discord = require('discord.js')
const { humanizeTime } = require('../../utils/time')
const { abbreviateNumber, numberWithCommas, capitalizeFirstLetter } = require('../../utils/datacrunch')
const axios = require('axios')

class LowestBin extends DiscordCommand {
	constructor(discord) {
		super(discord)

		this.discord = discord

		this.data = {
			name: 'lowestbin',
			description: 'Get the lowest bin for a specified item',
			options: [
				{
					name: 'item',
					description: 'name for the item you are looking for',
					type: 3,
					autocomplete: true,
					required: true,
				},
			],
		}
	}

	onCommand(interaction) {
		let id = interaction.options.get('item').value

		this.discord.redisGET().HMGET('auctions', id, async (err, reply) => {
			if (reply == null) return this.discord.onBroadcastMessage(`There is no data for this item. Please try again later.`, interaction)

			reply = JSON.parse(reply)

			const { data } = await axios.get(`https://api.mojang.com/user/profiles/${reply.auction.seller}/names`)

			const embed = new Discord.MessageEmbed()
				.setTitle(reply.auction.name)
				.setURL(`https://auctions.craftlink.xyz/items/${reply.auction.id}`)
				.setDescription(`**Note**: Auction house data is updated **~5** minutes.`)
				.setColor('9A48BB')
				.setFields(
					{
						name: 'Lowest Bin',
						value: `${numberWithCommas(Number(reply.auction.price))} [**${abbreviateNumber(Number(reply.auction.price))}**]`,
						inline: true,
					},
					{ name: 'Rarity', value: reply.auction.tier, inline: true },
					{ name: 'Seller', value: data[data.length - 1].name, inline: true },
					{ name: 'Ends In', value: humanizeTime((Number(reply.auction.ending) - +new Date()) / 1000), inline: true }
				)
				.setFooter({ text: 'Much love to Nariah!' })
				.setTimestamp()
				.setThumbnail('https://earlsribpalace.com/wp-content/uploads/2019/07/coming-soon-store-placeholder-image.gif')

			this.discord.onBroadcastEmbed(embed, interaction)
		})
	}

	async onAutocomplete(interaction) {
		const client = this.discord.redisGET()
		const item = interaction.options._hoistedOptions[0].value
		const response = []

		if (!item) {
			client.HSCAN('auctions', 0, 'COUNT', 24, (err, reply) => {
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
			client.HSCAN('auctions', 0, 'MATCH', `*${item.toUpperCase()}*`, 'COUNT', 10000, (err, reply) => {
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

module.exports = LowestBin
