const datacrunch = require('../../utils/datacrunch')

class UpdateBazaar {
	constructor(apiweb) {
		this.apiweb = apiweb

		this.bazaarProducts = {}
	}

	async updateProducts() {
		Object.keys(this.bazaarProducts).forEach(async item => {
			const product = this.bazaarProducts[item]

			await this.apiweb.redisGET().HMSET('bazaar', item.toUpperCase(), JSON.stringify(product), (err, reply) => {})
		})

		this.bazaarProducts = {}

		this.apiweb.app.log.api('Successfully refreshed bazaar data.')

		setTimeout(() => this.fetchProducts(), 30 * 10000)
	}

	async fetchProducts() {
		this.apiweb.app.log.api('Refreshing bazaar data...')

		const { products } = await this.apiweb.getBazaar()

		for (const item of Object.keys(products)) {
			const product = products[item].quick_status

			this.bazaarProducts[item] = {
				id: item.toUpperCase(),
				name: datacrunch.capitalizeFirstLetter(item.replace(/_/g, ' ').toLowerCase()),
				buyPrice: product.buyPrice,
				buyVolume: product.buyVolume,
				buyOrders: product.buyOrders,
				sellPrice: product.sellPrice,
				sellVolume: product.sellVolume,
				sellOrders: product.sellOrders,
			}
		}

		return await this.updateProducts()
	}
}

module.exports = UpdateBazaar
