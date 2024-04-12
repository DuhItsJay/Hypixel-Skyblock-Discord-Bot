const Discord = require('discord.js')
const constants = require('../../utils/constants')
const datacrunch = require('../../utils/datacrunch')

const findProfits = function (client, interaction) {
	const forgeItems = constants.forge_recipes
	const output = {}

	client.HGETALL('auctions', (err, reply) => {
		const auctions = reply

		client.HGETALL('bazaar', (err, reply) => {
			const bazaar = reply

			for (const key of Object.keys(forgeItems)) {
				const items = forgeItems[key]
				const recipe = []

				for (const item of Object.entries(items)) {
					const data = JSON.parse(auctions[item[0]] == undefined ? bazaar[item[0]] : auctions[item[0]])

					if (data == undefined) break

					data.hasOwnProperty('sales') ? (data.type = 'AUCTION') : (data.type = 'BAZAAR')

					let index = 0,
						count = 0

					while (count < item[1]) {
						if (data.type == 'AUCTION') {
							if (!data.sales[index]) index = 0

							count += data.sales[index].count
							recipe.push(parseInt(data.sales[index].price))
						}

						if (data.type == 'BAZAAR') {
							count += data.count ?? 1
							recipe.push(parseInt(data.buyPrice))
						}

						index++
					}
				}
				const listedData = JSON.parse(auctions[key] == undefined ? bazaar[key] : auctions[key])
				const name = listedData.hasOwnProperty('sales') ? listedData.auction.name : listedData.name
				const listedPrice = listedData.hasOwnProperty('sales') ? listedData.auction.price : listedData.buyPrice
				const craftPrice = recipe.reduce((a, b) => a + b, 0)

				if (craftPrice < listedPrice) {
					const difference = listedPrice - craftPrice

					output[key] = {
						id: key.toUpperCase(),
						name: name,
						profit: difference,
						auction: listedPrice,
						crafting: craftPrice,
					}
				}
			}

			const profits = Object.values(output).sort((a, b) => b.profit - a.profit, 0)

			formatForgeProfits(profits, interaction)
		})
	})
}

const formatForgeProfits = function (profits, interaction) {
	const page = new Discord.MessageEmbed()
		.setTitle('**Forge Profits**')
		.setDescription('**Note:** Known profits that are not listed could be missing data')
		.setColor('9A48BB')
		.setTimestamp()

	const buttons = new Discord.MessageActionRow().addComponents(
		new Discord.MessageButton().setEmoji('⬅️').setStyle('PRIMARY').setCustomId('left').setDisabled(),
		new Discord.MessageButton().setEmoji('➡️').setStyle('PRIMARY').setCustomId('right')
	)

	const fields = []

	for (const item of Object.values(profits)) {
		fields.push({
			name: `**${item.name}**`,
			value: `Profit: ${datacrunch.abbreviateNumber(item.profit)}\nCraft: ${datacrunch.abbreviateNumber(item.crafting)}\nAuction: ${datacrunch.abbreviateNumber(
				item.auction
			)}`,
			inline: true,
		})
	}

	for (i = 0; i < 9; i++) {
		page.addFields(fields[i])
	}

	var page_num = 1
	var total_page = Math.ceil(fields.length / 9)
	page.setFooter({ text: `Page 1/${total_page}. Much love to Nariah!` })

	interaction.reply({ embeds: [page], components: [buttons], fetchReply: true }).then(msg => {
		const filter = i => i.user.id === interaction.user.id
		const collector = msg.createMessageComponentCollector({ filter: filter, idle: 30000 })
		var currIndex = 9

		collector.on('collect', b => {
			b.deferUpdate()
			page.spliceFields(0, 25)

			if (b.customId == 'left') {
				page_num--
				page.setFooter({ text: `Page ${page_num}/${total_page}. Much love to Nariah!` })
				for (var index = Math.max(currIndex - 18, 0); index < currIndex - 9; index++) {
					page.addFields(fields[index])
				}
				currIndex -= 9
				currIndex <= 9 ? buttons.components[0].setDisabled(true) && buttons.components[1].setDisabled(false) : buttons.components[0].setDisabled(false)
				msg.edit({ embeds: [page], components: [buttons] })
			}
			if (b.customId == 'right') {
				page_num++
				page.setFooter({ text: `Page ${page_num}/${total_page}. Much love to Nariah!` })
				for (var index = currIndex; index < Math.min(currIndex + 9, fields.length); index++) {
					page.addFields(fields[index])
				}
				currIndex += 9

				currIndex >= fields.length
					? buttons.components[1].setDisabled(true) && buttons.components[0].setDisabled(false)
					: buttons.components[1].setDisabled(false)

				msg.edit({ embeds: [page], components: [buttons] })
			}
		})

		collector.on('end', () => {
			const timed = new Discord.MessageActionRow().addComponents(
				new Discord.MessageButton().setStyle('DANGER').setLabel('Timed Out').setCustomId('timeout').setDisabled()
			)

			msg.edit({ embeds: [page], components: [timed] })
		})
	})
}

module.exports = { findProfits }
