const infopage = require('../guildinformation/infopage')
const resourcespage = require('../guildinformation/resourcespage')
const rulespage = require('../guildinformation/rulespage')
const ticketrulespage = require('../guildinformation/ticketrulespage')
const config = require('./config')
const settings = require('./settings')

module.exports = {
  name: 'guild',
  description: 'module for all guild informative pages/database',
  execute(message, args) {
    var command = args[0]
    args.shift()

    if (command == 'infopage') {
      infopage.execute(message, args)
    } else if (command == 'rulespage') {
      rulespage.execute(message, args)
    } else if (command == 'resourcespage') {
      resourcespage.execute(message, args)
    } else if (command == 'ticketrulespage') {
      ticketrulespage.execute(message, args)
    } else if (command == 'settings') {
      settings.execute(message, args)
    } else if (command == 'config') {
      config.execute(message, args)
    } else {
      message.channel.send('The command you have entered is invalid! Please check <a!help staff> to learn the commands')
    }
  },
}
