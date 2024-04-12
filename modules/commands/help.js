const Discord = require('discord.js')
const sharpBlue = '#0e4eb2';
const calmPurple = '#574982';

const helpPage = new Discord.MessageEmbed()
  .setTitle('★ __Astrals Bot Commands__ ★')
  .setColor(calmPurple)
  .setDescription(`There are an array of commands to use!`)
  .addFields(
    { name: '__**Command Input Types**__', value: "`<>` = Required Arguments\n`[]` = Optional Arguments"},
    { name: '\u200B', value: 'Please report all bugs and glitches by using #tickets'},
    { name: '\u200B', value: '\u200B'},
    { name: 'a!dungeons', value: 'View your dungeon stats'},
    { name: 'a!skills', value: 'View your skill stats'},
    { name: 'a!slayers', value: 'View your slayer stats'},
    { name: 'a!weight', value: 'See how much weight you have total and for each category'},
    { name: 'a!ping', value: 'Ping the bot!'},
    { name: 'a!link <IGN>', value: 'Link your account with AstralsBot'},
    { name: 'a!setprofile <Profile cute name>', value: 'Set your default profile for Skyblock stats'},
    { name: 'a!elections', value: 'See which mayor is winning!'},
    { name: 'a!scamcheck <IGN>', value: 'Check if a player is a scammer'},
    { name: '\u200B', value: '\u200B'},
  )
  .setFooter(`Bot created by DuhItsJay 😎`, 'https://static.wikia.nocookie.net/hypixel-skyblock/images/a/a0/Wiki-logo.png/revision/latest?cb=20210425051828')
  .setTimestamp();

module.exports = {
  name: 'help',
  description: 'normal help command',
  execute(message, args) {

    message.channel.send(helpPage)
  }
}
