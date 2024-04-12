const Discord = require('discord.js')

const ticketEmbed = new Discord.MessageEmbed().setDescription(`
  ➦ No spam pinging staff or the ticket reviewer.

  ➦ Non-serious issues will be dismissed and you will be warned.
    
  ➦ If you are wanting to apply. Open a ticket and click "Apply To Guild" button using the AstralsBot.
    
  ➦ If you are wanting to report a player breaking the rules, please either dm a staff or open a ticket and use the AstralsBot.
    
    More rules and guidelines will be added in the future.`)

module.exports = {
  name: 'ticketrules',
  description: 'rules for ticket',
  execute(message, args) {
    message.delete()
    message.channel.send({
      files: ['../../../guild_art/titleboards/ticket_rules_page/TicketRules.png'],
      embeds: [ticketEmbed],
    })
  },
}
