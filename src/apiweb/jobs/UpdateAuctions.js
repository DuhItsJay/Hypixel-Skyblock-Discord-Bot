const petGenerator = require('../contracts/PetGenerator')
const datacrunch = require('../../utils/datacrunch')

class UpdateAuctions {
	constructor(apiweb) {
		this.apiweb = apiweb

		this.auctions = {}
	}

	async fetchAuctions(pages = 0) {
		this.apiweb.app.log.api('Refreshing auction data...')

		for (var i = 0; i <= pages; i++) {
			const auctionPage = await this.apiweb.getAuctionPage(i)
			if (!auctionPage.success) continue

			pages = auctionPage.totalPages - 1
			await this.processAuctions(auctionPage)
		}

		return await this.refreshAuctions()
	}

	async refreshAuctions() {
		Object.keys(this.auctions).forEach(async item => {
			const sales = this.auctions[item].map(i => ({ price: i.price, count: i.count }))

			const lowest = Math.min(...sales.map(i => i.price))
			const auction = this.auctions[item].filter(i => i.price === lowest)[0]

			const json = { sales: sales, auction: auction }

			await this.apiweb.redisGET().UNLINK(item.toUpperCase(), (err, reply) => {})
			await this.apiweb.redisGET().HMSET('auctions', item.toUpperCase(), JSON.stringify(json), (err, reply) => {})
		})

		this.auctions = {}

		this.apiweb.app.log.api('Successfully refreshed auction data.')

		setTimeout(() => this.fetchAuctions(), 30 * 10000)
	}

	async processAuctions(data) {
		data.auctions
			.filter(a => a.bin)
			.forEach(async auction => {
				const item = await datacrunch.decodeNBT(auction.item_bytes)

				const ExtraAttributes = item.tag.value.ExtraAttributes.value
				const { id, name } = this.getAttributes(ExtraAttributes, auction.item_name)

				const format = {
					id: id.toUpperCase(),
					name: datacrunch.capitalizeFirstLetter(name),
					price: auction.starting_bid,
					tier: auction.tier,
					seller: auction.auctioneer,
					ending: auction.end,
					count: item.Count.value,
				}

				Object.keys(this.auctions).includes(id) ? this.auctions[id].push(format) : (this.auctions[id] = [format])
			})
	}

	getAttributes(item, itemName) {
		let itemId = item.id.value

		if (itemId == 'ENCHANTED_BOOK' && item.enchantments) {
			const enchants = Object.keys(item.enchantments.value)

			if (enchants.length == 1) {
				const value = item.enchantments.value[enchants[0]].value

				itemId = `${enchants[0]}_${value}`
				itemName = datacrunch.capitalizeFirstLetter(`${enchants[0]} ${value}`)
			}
		}

		if (itemId == 'PET') {
			const pet = JSON.parse(item.petInfo.value)
			const data = petGenerator.calculateSkillLevel(pet)

			if (data.level == 1 || data.level == 100 || data.level == 200) {
				itemId = `lvl_${data.level}_${pet.tier}_${pet.type}`
				itemName = `[Lvl ${data.level}] ${datacrunch.capitalizeFirstLetter(`${pet.tier} ${pet.type}`)}`
			}
		}

		return {
			id: itemId,
			name: itemName,
		}
	}
}

module.exports = UpdateAuctions
