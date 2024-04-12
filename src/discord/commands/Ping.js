const DiscordCommand = require('../../contracts/DiscordCommand')

class Ping extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.discord = discord

    this.data = {
      name: 'ping',
      description: 'Replies with Pong!',
    }
  }

  onCommand(interaction) {
    var start = +new Date()

    // task starts
    for (var i = 0; i < 100000000; i++);
    // task ends

    var end = +new Date()

    this.discord.onBroadcastMessage(`Pong! This message was executed in ${end - start}ms!`, interaction)
  }
}

module.exports = Ping
