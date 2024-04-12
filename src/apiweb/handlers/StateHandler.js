const { stripIndent } = require('common-tags')
const axios = require('axios')

class StateHandler {
	APICONFIG = {
		KEY: ['63d4bfcd-9775-47cc-90ba-04badc78bb53', '131aa559-3869-4bba-b79f-84e8e3a5c627'],
		REQUESTS: 0,
		LIMIT: 120,
		RESERVE: false,
	}

	environmentOverrides = {
		KEY: val => (this.APICONFIG.KEY = val),
		REQUESTS: val => (this.APICONFIG.REQUESTS = val),
		LIMIT: val => (this.APICONFIG.LIMIT = val),
		RESERVE: val => (this.APICONFIG.RESERVE = val),
	}

	constructor(apiweb) {
		this.apiweb = apiweb
	}

	get properties() {
		return this.APICONFIG
	}

	registerEvents() {
		this.apiweb.redisGET().GET('API', (err, reply) => {
			if (reply != null) {
				reply = JSON.parse(reply)

				if (!reply.RESERVE && reply.KEY == null && this.apiweb) reply.RESERVE = true
				if (reply.KEY != null && this.getKeyStatus(reply.KEY.toString().split(','))) reply.RESERVE = false

				this.APICONFIG = reply
			}

			for (let environment of Object.keys(process.env)) {
				if (this.environmentOverrides.hasOwnProperty(environment)) {
					this.environmentOverrides[environment](process.env[environment])
				}
			}

			this.apiweb.redisGET().SET('API', JSON.stringify(this.APICONFIG), (err, reply) => this.onConfigureAPI(err, reply, this.APICONFIG))
		})
	}

	onConfigureAPI(err, reply, json) {
		this.apiweb.app.log.api(stripIndent`\n
		----------------------------------------
		API Configuration Complete
		Errors: ${err}

		Current CONFIG
		KEY: ${json.KEY}
		RESERVE: ${json.RESERVE}
		----------------------------------------`)
	}

	async getKeyStatus(key_list) {
		let success = false

		for (let index = 0; index < key_list.length; index++) {
			const { data } = await axios.get(`https://api.hypixel.net/key?key=${key_list[index]}`)
			if (!data.success) key_list.splice(index, 1)

			success = success || data.success
		}

		return success
	}

	onReserve() {
		this.environmentOverrides.RESERVE(true)
		this.apiweb.redisGET().SET('API', JSON.stringify(this.APICONFIG), (err, reply) => this.onConfigureAPI(err, reply, this.APICONFIG))

		return true
	}

	onChange(type, value) {
		let array = []
		array.push(this.properties.KEY.toString().split(','))

		if (type == 'API') {
			if (this.getKeyStatus(value)) {
				array.push(value)
				this.properties.KEY = array
			} else this.discord.onBroadcastMessage(`An error occurred! API Key is not valid`, interaction)
		} else {
			this.APICONFIG[type] = value
		}
		this.apiweb.redisGET().SET('API', JSON.stringify(this.APICONFIG), (err, reply) => this.onConfigureAPI(err, reply, this.APICONFIG))
	}
}

module.exports = StateHandler
