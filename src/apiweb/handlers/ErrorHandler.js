const EventHandler = require('../../contracts/EventHandler')

class ErrorHandler extends EventHandler {
	constructor(apiweb) {
		super()

		this.apiweb = apiweb
	}

	onError(error) {
		if (this.isGlobalThrottle(error)) {
			//send contents to discord error manager - start reserve mode
			return this.apiweb.app.log.api('Hypixel API is having issues. A global throttle is placed on all API users.')
		}

		if (this.isThrottled(error)) {
			//send contents to discord error manager - start reserve mode
			return this.apiweb.app.log.api('API Requests Throttled - Key may have expired.')
		}

		if (this.isRequestTimeOut()) {
			return this.apiweb.app.log.api('Request Timed Out - API has hit soft limit.')
		}

		if (this.isForbidden(error)) {
			return this.apiweb.app.log.api(error.cause)
		}

		return false
	}

	isRequestTimeOut() {
		return this.apiweb.StateHandler.properties.REQUESTS == this.apiweb.StateHandler.properties.LIMIT
	}

	isForbidden(error) {
		return error.hasOwnProperty('success') && error.success == false
	}

	isThrottled(error) {
		return error.hasOwnProperty('throttle') && error.throttle == true
	}

	isGlobalThrottle(error) {
		return error.hasOwnProperty('global') && error.global == true
	}
}

module.exports = ErrorHandler
