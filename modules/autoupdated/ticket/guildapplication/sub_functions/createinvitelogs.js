const fs = require('fs')

async function createlog(msg, truncWeight, username, author, config) {
  msg.channel.send(
    `Congrats on your acceptance <@${author['id']}>! You have been placed on the waiting list! You will be pinged you when you are able to join!`
  )

  var waiting_list = msg.guild.roles.cache.find(role => role.id === '858352467263488041')
  msg.guild.members.cache.find(user => user.id === author.id).roles.add(waiting_list)

  var waiting_list = config[msg.guild.id]['logs']['Waitlist Channel'].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')

  msg.guild.channels.cache.get(waiting_list).send(`${username} - ${truncWeight} <@${author['id']}>`)
}

module.exports = {
  name: 'createinvitelogs',
  description: 'creates invite logs',
  execute(message, acceptance, truncWeight, username, author) {
    var config = JSON.parse(fs.readFileSync('./modules/resources/data/config.json', 'utf8'))
    var msg = message.component

    if (acceptance) {
      createlog(msg, truncWeight, username, author, config)
    } else {
      msg.channel.send(
        'Sorry, but your application has been denied due to lack of fulfillment of guild requirements. You can reapply once you fulfill those requirements.'
      )
    }
  },
}
