const Configuration = require('./Configuration')
const APIManager = require('./apiweb/APIManager')
const DiscordManager = require('./discord/DiscordManager')
const RedisManager = require('./redis/RedisManager')
const Logger = require('./Logger')

class Application {
	async register() {
		this.config = new Configuration()
		this.log = new Logger()

		this.discord = new DiscordManager(this)
		this.redis = new RedisManager(this)
		this.apiweb = new APIManager(this)

		this.discord.setBridge(this.redis)
		this.redis.setBridge(this.discord)
		this.apiweb.setBridge(this.redis)

		this.apiweb.setAPI(this.discord)
		this.discord.setAPI(this.apiweb)
	}

	async connect() {
		this.redis.connect()
		this.discord.connect()
		this.apiweb.connect()
	}
}

module.exports = new Application()
