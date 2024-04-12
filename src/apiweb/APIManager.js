const axios = require('axios')
const URL = require('url').URL

const HYPIXEL_API = 'https://api.hypixel.net'
const PLAYER_ROUTE = HYPIXEL_API + '/player'
const GUILD_ROUTE = HYPIXEL_API + '/guild'
const AUCTIONS_ROUTE = HYPIXEL_API + '/skyblock/auctions'
const PROFILE_ROUTE = HYPIXEL_API + '/skyblock/profiles'
const BAZAAR_ROUTE = HYPIXEL_API + '/skyblock/bazaar'

const CommunicationBridge = require('../contracts/CommunicationBridge')
const ErrorHandler = require('./handlers/ErrorHandler')
const StateHandler = require('./handlers/StateHandler')
const UpdateAuctions = require('./jobs/UpdateAuctions')
const UpdateBazaar = require('./jobs/UpdateBazaar')

let currentIndex = 0

class APIManager extends CommunicationBridge {
	constructor(app) {
		super()

		this.app = app

		this.ErrorHandler = new ErrorHandler(this)
		this.StateHandler = new StateHandler(this)
		this.UpdateAuctions = new UpdateAuctions(this)
		this.UpdateBazaar = new UpdateBazaar(this)
	}

	connect() {
		this.StateHandler.registerEvents()
		this.UpdateAuctions.fetchAuctions()
		this.UpdateBazaar.fetchProducts()
	}

	rotateKey() {
		var tokens = this.StateHandler.properties.KEY

		if (currentIndex + 1 === tokens.length) currentIndex = -1
		currentIndex = currentIndex + 1

		return tokens[currentIndex]
	}

	requestChecks(data) {
		if (this.StateHandler.properties.RESERVE || this.ErrorHandler.onError(data)) return this.StateHandler.onReserve()

		return false
	}

	getActiveProfile(profiles, uuid) {
		return profiles.sort((a, b) => b.members[uuid].last_save - a.members[uuid].last_save)[0]
	}

	async getUUID(username) {
		const { data } = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`)

		return data.hasOwnProperty('id') ? data.id : 'terminate'
	}

	async getPlayerHead(uuid, embed) {
		embed.setThumbnail(`https://cravatar.eu/head/${uuid}`)
	}

	async getReserveData(userid) {
		this.API.onBroadcastMessage(`The bot is currently on reserve mode. Any data sent will not be guarantee accuracy.`)
		return this.redisGET().GET(userid, (err, reply) => JSON.parse(reply).skyblock_data)
	}

	async getPlayerProfile(uuid) {
		const url = new URL(PLAYER_ROUTE)
		url.searchParams.append('key', this.rotateKey())
		url.searchParams.append('uuid', uuid)

		const { data } = await axios(url.toString())

		if (this.requestChecks(data)) return this.API.onBroadcastMessage(`The bot is currently on reserve mode. Hypixel data cannot be accessed at this moment.`)
		this.StateHandler.properties.REQUESTS = Number(this.StateHandler.REQUESTS) + 1

		return data.player
	}

	async fetchRequest(uuid, user) {
		const url = new URL(PROFILE_ROUTE)
		url.searchParams.append('key', this.rotateKey())
		url.searchParams.append('uuid', uuid)

		let { data } = await axios(url.toString())

		if (this.requestChecks(data)) data = await this.getReserveData(user.id)
		this.StateHandler.properties.REQUESTS = Number(this.StateHandler.REQUESTS) + 1

		return data
	}

	async getGuildByName(guild_name) {
		const url = new URL(GUILD_ROUTE)
		url.searchParams.append('key', this.rotateKey())
		url.searchParams.append('name', guild_name)

		const { data } = await axios.get(url.toString())

		if (this.requestChecks(data)) return this.API.onBroadcastMessage(`The bot is currently on reserve mode. Guild data cannot be accessed at this moment.`)
		this.StateHandler.properties.REQUESTS = Number(this.StateHandler.REQUESTS) + 1

		return data
	}

	async getBazaar() {
		const url = new URL(BAZAAR_ROUTE)

		const response = await axios(url.toString())

		return response.data
	}

	async getAuctionPage(page) {
		const url = new URL(AUCTIONS_ROUTE)
		url.searchParams.append('page', page)

		const response = await axios(url.toString())

		return response.data
	}
}

module.exports = APIManager
