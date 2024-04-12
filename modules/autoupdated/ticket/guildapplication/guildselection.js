const Discord = require('discord.js')
const Disbut = require('discord-buttons')

const requestIGN = require('./application.js')

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
  name: 'guildselection',
  description: 'selecting the guild to apply for',
  execute(channel, button, redisClient) {
    var channel_name = channel.name

    channel_name = new Discord.MessageEmbed()
      .setTitle('★ __Ticket Help__ ★')
      .setDescription(
        `Which guild would you like to apply to?\n**\u200B**
            **The Astrals**: 1.75k Senither Weight Requirement (Leaderboard Guild)
            **The Astrals Cadet Academy**: Community Guild With No Requirements
            `
      )
      .setColor(calmPurple)
      .setFooter('Created by DuhItsJay', 'https://github.com/Programmerthefirst/AstralsBot/blob/main/commands/images/BotLogo.png?raw=true')
      .setTimestamp()

    const apply = new Disbut.MessageButton().setStyle('blurple').setLabel('The Astrals').setID('main')

    const report = new Disbut.MessageButton().setStyle('blurple').setLabel('The Astrals Cadet Academy').setID('community')

    const select = new Disbut.MessageActionRow().addComponents(apply, report)

    channel.send(channel_name, select).then(async embedMessage => {
      const buttonCollector = embedMessage.createButtonCollector(m => m.channel === channel, { time: 60000 })
      buttonCollector.on('collect', button => {
        try {
          var author = button.clicker
          embedMessage.edit(channel_name, disableButton(select))
          if (button.id == 'main') {
            requestIGN.execute(button, author, redisClient, channel)
          } else if (button.id == 'community') {
            const astrals = button.clicker.member.guild.roles.cache.find(role => role.id === '884209230863814656')
            const waitinglist = button.clicker.member.guild.roles.cache.find(role => role.id === '858352467263488041')

            let roles = button.clicker.member._roles

            if (roles.includes(astrals['id'])) {
              button.reply.send('Oops! You are already in the guild!')
              return
            } else if (roles.includes(waitinglist['id'])) {
              button.reply.send(
                'You have already applied and have been placed on the invite list! Please be patient - you will be pinged when a staff can invite you.'
              )
              return
            } else {
              redisClient.get(author.id, function (err, reply) {
                var json = JSON.parse(reply)
                var uuid = Object.keys(json).shift()
                var ign = json[uuid].username

                button.reply.send(
                  `Congrats on your acceptance <@${author['id']}>! You have been placed on the invite list! Please wait for a staff member to invite you!`
                )
                var waiting_list = embedMessage.guild.roles.cache.find(role => role.id === '858352467263488041')
                embedMessage.guild.members.cache.find(user => user.id === author.id).roles.add(waiting_list)

                embedMessage.guild.channels.cache.find(channel => channel.id === '883920597355229214').send(`${ign} <@${author['id']}>`)
              })
            }
          }
        } catch (err) {
          console.log(err)
        }
      })
    })
  },
}
