const Discord = require('discord.js')
const purple = '#574982'

function isChannel(parameter) {
  if (parameter == 'Not Set' || parameter == 'Required') {
    return '`' + `${parameter}` + '`'
  } else {
    return `<#${parameter}>`
  }
}

module.exports = {
  name: 'settings',
  description: 'change the bot configuration',
  execute(msg, args) {
    const config = require('../../config.json')

    const left = new Discord.MessageButton().setStyle('PRIMARY').setCustomId('left').setEmoji('⬅️').setDisabled(true)
    const right = new Discord.MessageButton().setStyle('PRIMARY').setCustomId('right').setEmoji('➡️')
    const first = new Discord.MessageButton().setStyle('PRIMARY').setCustomId('first').setEmoji('⏮️').setDisabled(true)
    const last = new Discord.MessageButton().setStyle('PRIMARY').setCustomId('last').setEmoji('⏭️')
    const stop = new Discord.MessageButton().setStyle('PRIMARY').setCustomId('stop').setEmoji('⏹️')
    const timeout = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton().setStyle('DANGER').setCustomId('timeout').setLabel('Timed Out').setDisabled(true)
    )

    const actionRow = new Discord.MessageActionRow().addComponents(first, left, stop, right, last)

    const settings_embed = new Discord.MessageEmbed()
      .setTitle('★ __**Bot Settings**__ ★')
      .setColor(purple)
      .setDescription(
        `
      ⏮️ - First page
      ⬅️ - Previous Page
      ⏹️ - Stop
      ➡️ - Next Page
      ⏭️ - Last page

      __**Edit Command**__
      a!config [type] edit <reference_ID> <arguments>

      __types__
      channel, logs

      use a!config help for more info!
      `
      )
      .setTimestamp()
      .setFooter('Created by DuhItsJay', 'https://github.com/Programmerthefirst/The-Astrals/blob/main/guild_art/Footer_Logo.png?raw=true')

    const key = new Discord.MessageEmbed()
      .setTitle('★ __**Bot Settings - API Key Settings**__ ★')
      .setColor(purple)
      .setDescription(
        `
        __API Key Info__
        API Key for hypixel api. Used to get data from Hypixel Server - mainly SkyBlock
        
        **API Key:** ${'`' + config.API['API Key'] + '`'}

        a!config apikey edit <api_key>

        __Max Requests Info__
        Maximum number of times the api key can be used before it throttles/expires.
        
        **Max Requests (per min):** ${'`' + config.API['Max Requests'] + '`'}`
      )
      .setTimestamp()
      .setFooter('Created by DuhItsJay', 'https://github.com/Programmerthefirst/The-Astrals/blob/main/guild_art/Footer_Logo.png?raw=true')

    const logs = new Discord.MessageEmbed()
      .setTitle('★ __**Bot Settings - Event/Log Channels**__ ★')
      .setColor(purple)
      .setDescription(
        `
        **Log Channel** (${'`LOGS`'}): ${isChannel(config.logs['LOGS'])}

        **Reports Channel** (${'`REPORTS`'}): ${isChannel(config.logs['REPORTS'])}
        
        **Suggestions Channel** (${'`SUGGESTIONS`'}): ${isChannel(config.logs['SUGGESTIONS'])}
        
        **Astrals Waiting List** (${'`ASTRALS_WAITING_LIST`'}): ${isChannel(config.logs['ASTRALS_WAITING_LIST'])}
        
        **Academy Waiting List** (${'`ACADEMY_WAITING_LIST`'}): ${isChannel(config.logs['ACADEMY_WAITING_LIST'])}      
      `
      )
      .setTimestamp()
      .setFooter('Created by DuhItsJay', 'https://github.com/Programmerthefirst/The-Astrals/blob/main/guild_art/Footer_Logo.png?raw=true')

    const channels = new Discord.MessageEmbed()
      .setTitle('★ __**Bot Settings - Event/Update Channels**__ ★')
      .setColor(purple)
      .setDescription(
        `
      **Verification** (${'`VERIFICATION`'}): ${isChannel(config.channels.VERIFICATION)}

      **Skyblock Date** (${'`SKYBLOCK_DATE`'}): ${isChannel(config.channels.SKYBLOCK_DATE)}

      **Skyblock Events** (${'`SKYBLOCK_EVENTS`'}): ${isChannel(config.channels.SKYBLOCK_EVENTS)}

      **Fetchur** (${'`FETCHUR`'}): ${isChannel(config.channels.FETCHUR)}
      
      **Farming Contests** (${'`FARMING_CONTESTS`'}): ${isChannel(config.channels.FARMING_CONTESTS)}
      `
      )
      .setTimestamp()
      .setFooter('Created by DuhItsJay', 'https://github.com/Programmerthefirst/The-Astrals/blob/main/guild_art/Footer_Logo.png?raw=true')

    const stats = new Discord.MessageEmbed()
      .setTitle('★ __**Bot Settings - Stat Display Channels**__ ★')
      .setColor(purple)
      .setDescription(
        `
      **Main Guild Count** (${'`MAIN_GUILD_COUNT`'}): ${isChannel(config.channels.MAIN_GUILD_COUNT)}

      **Cadet Guild Count** (${'`CADET_GUILD_COUNT`'}): ${isChannel(config.channels.CADET_GUILD_COUNT)}

      **Current Leaderboard Ranking** (${'`LEADERBOARD_RANK`'}): ${isChannel(config.channels.LEADERBOARD_RANK)}  
        `
      )
      .setTimestamp()
      .setFooter('Created by DuhItsJay', 'https://github.com/Programmerthefirst/The-Astrals/blob/main/guild_art/Footer_Logo.png?raw=true')

    const pages = [settings_embed, key, logs, channels, stats]
    var i = 0

    msg.channel.send({ components: [actionRow], embeds: [pages[i]] }).then(int => {
      const collector = int.createMessageComponentCollector({
        componentType: 'BUTTON',
        time: 60000,
      })

      collector.on('collect', async button => {
        if (button.user.id === msg.author.id) {
          if (button.customId == 'stop') {
            button.deferUpdate()
            collector.stop()
          } else if (button.customId == 'last' && i != pages.length - 1) {
            i = pages.length - 1
            actionRow.components.forEach(button => {
              if (button.customId != 'stop') {
                if (button.customId == 'right' || button.customId == 'last') {
                  button.setDisabled()
                } else {
                  button.setDisabled(false)
                }
              }
            })
            await button.update({
              components: [actionRow],
              embeds: [pages[i]],
            })
          } else if (button.customId == 'first' && i != 0) {
            i = 0
            actionRow.components.forEach(button => {
              if (button.customId != 'stop') {
                if (button.customId == 'left' || button.customId == 'first') {
                  button.setDisabled()
                } else {
                  button.setDisabled(false)
                }
              }
            })
            await button.update({
              components: [actionRow],
              embeds: [pages[i]],
            })
          } else if (button.customId == 'left') {
            i--
            if (i != 0) {
              actionRow.components.forEach(button => button.setDisabled(false))
              button.update({
                components: [actionRow],
                embeds: [pages[i]],
              })
            } else {
              actionRow.components.forEach(button => {
                if (button.customId == 'first' || button.customId == 'left') {
                  button.setDisabled(true)
                }
              })
              button.update({
                components: [actionRow],
                embeds: [pages[i]],
              })
            }
          } else if (button.customId == 'right') {
            i++
            if (i != pages.length - 1) {
              actionRow.components.forEach(button => button.setDisabled(false))
              button.update({
                components: [actionRow],
                embeds: [pages[i]],
              })
            } else {
              actionRow.components.forEach(button => {
                if (button.customId == 'last' || button.customId == 'right') {
                  button.setDisabled(true)
                }
              })
              button.update({
                components: [actionRow],
                embeds: [pages[i]],
              })
            }
          }
        } else {
          button.reply({
            content: "This isn't your paginator!",
            ephemeral: true,
          })
        }
      })

      collector.on('end', async () => {
        await int.edit({ components: [timeout], embeds: [pages[i]] })
      })
    })
  },
}
