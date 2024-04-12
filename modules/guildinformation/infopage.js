const Discord = require('discord.js')

//const sharpBlue = '#0e4eb2';
const calmPurple = '#574982'

module.exports = {
  name: 'info',
  description: 'Information for the guild application',
  async execute(message, args) {
    const infoPage = new Discord.MessageEmbed()
      .setColor(calmPurple)
      .setDescription(
        'We are a leaderboard pushing, competitive, highly active and friendly skyblock guild. Although our main focus revolves around skyblock, we play other games such as skywars and bedwars too.'
      )
      .addFields(
        {
          name: '\u200B',
          value: '**We have two guilds which players can apply to**',
        },
        {
          name: `**➦ The Astrals**`,
          value: '\u200B',
          inline: true,
        },
        {
          name: '**➦ The Astrals Cadet Academy**',
          value: '\u200B',
          inline: true,
        }
      )

    const TheAstrals = new Discord.MessageEmbed()
      .setColor(calmPurple)
      .setDescription(
        `__**The Guild Master for this guild is Night_S1n**__ ~ "My goal is to strive for players to have fun and be active within a community they can feel accepted in"`
      )

      .addFields(
        {
          name: '\u200B',
          value: '**In order to qualify to join our guild, you must meet the following conditions:**',
          inline: false,
        },
        {
          name: `\u200B`,
          value: '**➦ 1,750 Weight minimum**',
          inline: true,
        },
        {
          name: '\u200B',
          value: '**➦ Friendly, Active and Leaderboard Competitive**',
          inline: true,
        },
        {
          name: '\u200B\n__**Apply to the guild!**__',
          value: 'Open up a ticket in #🎫tickets!',
          inline: false,
        },
        {
          name: '\u200B',
          value: 'Please keep in mind that these requirements are subject to change in the future.',
          inline: false,
        }
      )

    const CadetAcademy = new Discord.MessageEmbed()
      .setColor(calmPurple)
      .setDescription(
        `__**The Guild Master for this guild is DuhItsJay**__  ~ "What's the point of running a guild or a team, if you don't even care about helping others progress"`
      )

      .addFields(
        {
          name: '\u200B',
          value: '**In order to qualify to join our guild, you must meet the following conditions:**',
          inline: false,
        },
        {
          name: `**➦ Be Active and friendly**`,
          value: '\u200B',
          inline: true,
        },
        {
          name: '\u200B',
          value: '**➦ Willing to help guild members progress**',
          inline: true,
        },
        {
          name: '\u200B\n__**Apply to the guild!**__',
          value: 'Open up a ticket in #🎫tickets!',
          inline: false,
        },
        {
          name: '\u200B',
          value: 'Please keep in mind that these requirements are subject to change in the future.',
          inline: false,
        }
      )

    await message.delete()
    await message.channel.send({ files: ['../../../guild_art/AstralsLogo.gif'] })
    await message.channel.send({
      files: ['../../../guild_art/titleboards/TransparentImage.png'],
    })
    await message.channel.send({
      files: ['../../../guild_art/titleboards/welcome_info_page/Guilds.png'],
    })
    await message.channel.send({ embeds: [infoPage] })
    await message.channel.send({
      files: ['../../../guild_art/titleboards/TransparentImage.png'],
    })
    await message.channel.send({
      files: ['../../../guild_art/titleboards/welcome_info_page/TheAstrals_Small.png'],
    })
    await message.channel.send({ embeds: [TheAstrals] })
    await message.channel.send({
      files: ['../../../guild_art/titleboards/TransparentImage.png'],
    })
    await message.channel.send({
      files: ['../../../guild_art/titleboards/welcome_info_page/CadetAcademy.png'],
    })
    await message.channel.send({ embeds: [CadetAcademy] })
  },
}
