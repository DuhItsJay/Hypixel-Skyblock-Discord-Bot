const Discord = require('discord.js')
const calmPurple = '#574982'

const guildForumPost = new Discord.MessageEmbed()
  .setColor(calmPurple)
  .setTitle('★ __The Astrals__ - A Early to Late Game Guild ★')
  .addFields(
    {
      name: '**Our Goal:**',
      value: 'Strive for players to have fun and be active within a community they can feel accepted in',
    },
    { name: '\u200B', value: '**Founded By:**' },
    { name: '__Guild Master__', value: '➦ Night_Sin02', inline: true },
    { name: '__Head Admin__', value: '➦ Aprism', inline: true },
    { name: '__Server Developer__', value: '➦ DuhItsJay', inline: true },
    { name: '\u200B', value: 'DaddyDarth', inline: true },
    { name: '__Staff__', value: '➦ MXHYM', inline: true },
    { name: '\u200B', value: 'PeachBear88', inline: true },
    {
      name: '\u200B',
      value:
        '[The Astrals Recruiting Forum Post](https://hypixel.net/threads/astral-the-astrals-mid-to-late-game-discord-60-people-o-9-apps-open.4109385/) and [Cadet Academy Recruiting Forum Post](https://hypixel.net/threads/the-astrals-cadet-academy-new-guild-early-mid-game-no-reqs.4501224/#post-32583837) earned a majority of our members. This is where it all began. We take pride in our guild and bumping it is one of the ways to support us.',
    }
  )
  .setImage('attachment://AstralsLogo.gif')

const StatsLeaderboard = new Discord.MessageEmbed()
  .setColor(calmPurple)
  .setTitle('★ Competitive Guild ★')
  .setDescription(
    'As a guild, The Astrals stride to be the best they can be. And to assert ourselves as a guild meant for competition, we are aiming for the leaderboards.'
  )
  .addFields(
    {
      name: 'Check Player Stats',
      value: '[Skycrypt](https://sky.shiiyu.moe/)',
      inline: true,
    },
    {
      name: 'Top Standing Guilds',
      value: '[Guilds Leaderboard](https://hypixel-leaderboard.senither.com/guilds)',
      inline: true,
    },
    {
      name: 'Astrals Guild Stats',
      value: '[Guild Scanner](https://guild-scanner.senither.com/)',
      inline: true,
    }
  )

const embedMod = new Discord.MessageEmbed()
  .setColor(calmPurple)
  .setTitle('★ Requirements: 1.8.9 FORGE ★')
  .setDescription(
    'Below is a guide created by Night_Sin02. This post specifies what mods to download for Forge. These have been proven to be useful for new players starting to sweat the game out.'
  )
  .addField(
    '\u200B',
    '[Best Mods For Hypixel Skyblock](https://hypixel.net/threads/best-mods-for-hypixel-skyblock-and-general-use-in-hypixel-as-of-5-12-21.4224402/)'
  )

const dungeonSecret = new Discord.MessageEmbed()
  .setColor(calmPurple)
  .setDescription(
    'There are a multitude of servers we could recommend for you to join, but for the majority of you who prioritize dungeons, learning secrets are a major struggle for progress and skill.'
  )
  .addField('\u200B', '[Dungeon Secret Discord Server](https://discord.com/invite/dsg)')

module.exports = {
  name: 'resources',
  description: 'guild resources page',
  async execute(message, args) {
    message.delete()
    await message.channel.send({
      files: [
        '../../../guild_art/titleboards/resource_page/GuildResources.png',
        '../../../guild_art/titleboards/TransparentImage.png',
        '../../../guild_art/titleboards/resource_page/GuildForum.png',
      ],
      embeds: [guildForumPost],
    })
    await message.channel.send({
      files: ['../../../guild_art/titleboards/TransparentImage.png', '../../../guild_art/titleboards/resource_page/StatsAndLeaderboards.png'],
      embeds: [StatsLeaderboard],
    })
    await message.channel.send({
      files: ['../../../guild_art/titleboards/TransparentImage.png', '../../../guild_art/titleboards/resource_page/Modifications.png'],
      embeds: [embedMod],
    })
    await message.channel.send({
      files: ['../../../guild_art/titleboards/TransparentImage.png', '../../../guild_art/titleboards/resource_page/DungeonSecrets.png'],
      embeds: [dungeonSecret],
    })
    await message.channel.send({
      files: ['../../../guild_art/titleboards/TransparentImage.png'],
    })
  },
}
