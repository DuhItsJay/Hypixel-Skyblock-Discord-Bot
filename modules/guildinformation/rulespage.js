const Discord = require('discord.js')
const calmPurple = '#574982'

const discordChatandGuildRules = new Discord.MessageEmbed().setColor(calmPurple).addFields(
  {
    name: '__**Discord TOS**__',
    value: '➦ You must abide by Discord [Terms of Service](https://discord.com/terms) & their [Guidelines](https://discord.com/guidelines).\n\u200B',
  },
  {
    name: '__**Chatting and Behavior Etiquette**__',
    value: '➦ Inappropriate behavior will not be tolerated.',
  },
  { name: '\u200B', value: '\u200B', inline: true },
  {
    name: '★ These behaviors include, but not limited to toxicity, harassment, racism, bigotry, homophobia, etc.\n★  If we see that you are being toxic, either ingame or in this server, you will be instantly muted. We do not condone nor tolerate this behavior.',
    value: '\u200B',
    inline: true,
  },
  {
    name: '__**NSFW Content**__',
    value: '➦ No NSFW content will be tolerated.',
  },
  { name: '\u200B', value: '\u200B', inline: true },
  {
    name: '★ This includes graphics, intent and the talk of the subject.',
    value: '\u200B',
    inline: true,
  },
  {
    name: '__**Interacting With Staff**__',
    value: '➦ Follow staff orders. They take action with good reason.',
  },
  { name: '\u200B', value: '\u200B', inline: true },
  {
    name: '★ Disobeying staff could result in punishment.',
    value: '\u200B',
    inline: true,
  },
  {
    name: '__**DMs and Pings**__',
    value: '➦ Direct messaging and pinging anyone without reason is punishable\n\u200B',
  },
  {
    name: '__**Miscellaneous**__',
    value:
      '➦ No advertising except in #advertising.\n➦ No external discord server links (unless approved)\n➦ Do not ask for loans without collateral or if you have just joined.\n➦ No Doxxing or D-Dossing of any kind is allowed.\n➦ Bypassing punishments is not allowed\n\u200B',
  }
)

const voicechannelRules = new Discord.MessageEmbed().setColor(calmPurple).addFields(
  {
    name: '__**Rules**__',
    value: '➦ All Guild and discord chat rules still apply.\n\u200B',
  },
  {
    name: '__**Ear Rape**__',
    value: '➦ Any sound resembling ear rape is disallowed.',
  },
  { name: '\u200B', value: '\u200B', inline: true },
  {
    name: `★ By indulging in such activity, you will be harming your own and other's health.`,
    value: '\u200B',
    inline: true,
  },
  {
    name: '__**Mic Etiquete**__',
    value: '➦ No playing music through your mic.',
  }
)

const smpRules = new Discord.MessageEmbed().setColor(calmPurple).addFields(
  {
    name: '__**Rules**__',
    value: '➦ All Guild and discord chat rules still apply.\n\u200B',
  },
  {
    name: '__**Player Interactions**__',
    value: '➦ PvP is allowed.\n ➦ Stealing/Robbing items of other players is disallowed.\n\u200B',
  },
  { name: '__**World Interaction**__', value: 'No griefing.' },
  { name: '\u200B', value: '\u200B', inline: true },
  {
    name: `★ If proof of you griefing is provided or you admit to griefing, you will be kicked from the SMP `,
    value: '\u200B',
    inline: true,
  }
)

const punishmentSystem = new Discord.MessageEmbed().setColor(calmPurple).addFields(
  { name: '__**Strike #1**__', value: '6 hour mute.\n\u200B' },
  { name: '__**Strike #2**__', value: '24 hour mute.\n\u200B' },
  {
    name: '__**Strike #3**__',
    value: 'Blacklist from the guild and kick from the discord.\n\u200B',
  },
  { name: '\u200B', value: '\u200B' },
  {
    name: '★ If you get muted in game, you will get muted in discord for that allotted time as well and vice versa',
    value: '\u200B',
    inline: true,
  }
)

module.exports = {
  name: 'rules',
  description: 'Guild Rules Page',
  async execute(message, args) {
    message.delete()

    await message.channel.send({
      files: [
        '../../../guild_art/titleboards/TheAstrals.png',
        '../../../guild_art/titleboards/rules_page/GuildRules.png',
        '../../../guild_art/titleboards/TransparentImage.png',
        '../../../guild_art/titleboards/rules_page/GuildAndDiscordChatRules.png',
      ],
      embeds: [discordChatandGuildRules],
    })
    await message.channel.send({
      files: ['../../../guild_art/titleboards/TransparentImage.png', '../../../guild_art/titleboards/rules_page/VoiceChannelRules.png'],
      embeds: [voicechannelRules],
    })
    await message.channel.send({
      files: ['../../../guild_art/titleboards/TransparentImage.png', '../../../guild_art/titleboards/rules_page/GuildSMPRules.png'],
      embeds: [smpRules],
    })
    await message.channel.send({
      files: ['../../../guild_art/titleboards/TransparentImage.png', '../../../guild_art/titleboards/rules_page/ThreeStrikeSystem.png'],
      embeds: [punishmentSystem],
    })
    await message.channel.send({
      files: ['../../../guild_art/titleboards/TransparentImage.png'],
    })
  },
}
