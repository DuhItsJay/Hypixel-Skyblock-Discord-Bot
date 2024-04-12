class CommunicationBridge {
	constructor() {
		this.bridge = null
		this.API = null
	}

	//Redis-Discord Bridge Communication
	getBridge() {
		return this.bridge
	}

	setBridge(bridge) {
		this.bridge = bridge
	}

	redisGET() {
		return this.bridge.onRedisGET()
	}

	newMember(param1, param2) {
		return this.bridge.onNewMember(param1, param2)
	}

	ticketDelete(user, type) {
		return this.bridge.onListRemove(user, type)
	}

	addTicketUser(user, type) {
		return this.bridge.onListAdd(user, type)
	}

	connect() {
		throw new Error('Communication bridge connection is not implemented yet!')
	}

	onBroadcast(event) {
		throw new Error('Communication bridge broadcast handling is not implemented yet!')
	}

	//Discord-API, Redis-API Communication
	getAPI() {
		return this.API
	}

	setAPI(API) {
		this.API = API
	}
}

module.exports = CommunicationBridge
