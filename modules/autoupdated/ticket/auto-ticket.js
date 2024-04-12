const Discord = require('discord.js')

const Disbut = require('discord-buttons')

const guildselection = require('./guildapplication/guildselection')

const suggestion = require('./suggest.js')

const player_report = require('./player_report.js')

const sharpBlue = '#0e4eb2'

const calmPurple = '#574982'

function disableButton(select) {
  const disabled = new Disbut.MessageActionRow()

  select.toJSON().components.forEach(messageButton => {
    messageButton.setStyle('gray').setDisabled()

    disabled.addComponent(messageButton)
  })

  return disabled
}

module.exports = {
  name: 'auto-ticket',

  description: 'when a ticket is created the bot automatically engages in it',

  execute(channel, AstralsBot, redisClient) {
    var channel_name = channel.name

    channel_name = new Discord.MessageEmbed()

      .setTitle('★ __Ticket Help__ ★')

      .setDescription(
        `Hi there! I am AstralsBot! I will be assisting you today :D. React below to progress.\n**\u200B**

            **Apply to the guild**: Submit an application to this guild

            **Player reporting**: Report a player for breaking rules or TOS

            **Suggestions/Feedback**: Have something for staff or the discord server to improve upon?

            **Miscellaneous - Talk to staff**: Other questions or concerns

            `
      )

      .setColor(calmPurple)

      .setFooter(
        'Created by DuhItsJay',

        'https://github.com/Programmerthefirst/AstralsBot/blob/main/commands/images/BotLogo.png?raw=true'
      )

      .setTimestamp()

    const apply = new Disbut.MessageButton()

      .setStyle('blurple')

      .setLabel('Apply To The Guild!')

      .setID('application')

    const report = new Disbut.MessageButton()

      .setStyle('blurple')

      .setLabel('Player Reporting')

      .setID('report')

    const suggest = new Disbut.MessageButton()

      .setStyle('blurple')

      .setLabel('Suggestions/Feedback')

      .setID('suggest')

    const misc = new Disbut.MessageButton()

      .setStyle('blurple')

      .setLabel('Miscellaneous')

      .setID('misc')

    const select = new Disbut.MessageActionRow().addComponents(
      apply,

      report,

      suggest,

      misc
    )

    channel.send(channel_name, select).then(async embedMessage => {
      const buttonCollector = embedMessage.createButtonCollector(
        m => m.channel === channel,

        { time: 60000 }
      )

      buttonCollector.on('collect', button => {
        try {
          var author = button.clicker

          embedMessage.edit(channel_name, disableButton(select))

          if (button.id == 'application') {
            button.reply.defer()

            guildselection.execute(channel, button, redisClient)
          } else if (button.id == 'report') {
            player_report.execute(channel, button, author)
          } else if (button.id == 'suggest') {
            suggestion.execute(channel, button, author)
          } else if (button.id == 'misc') {
            var role = embedMessage.guild.roles.cache.find(r => r.name == 'Ticket-Reviewer')

            button.reply.send(`Please wait :). A staff will be with you shortly - ${role}`)
          }
        } catch (err) {
          console.log(err)
        }
      })
    })
  },
}
