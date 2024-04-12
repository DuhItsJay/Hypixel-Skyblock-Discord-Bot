const Discord = require('discord.js')


function messageCollector (channel, button, author, config) {

    button.reply.send("Type your suggestion below in one message :D").then( msg => {
        const collector = new Discord.MessageCollector(channel, m => m.author.id === author.id, { time: 10000 });
        collector.on('collect', message => {

            var suggestion_channel = config[message.guild.id]["logs"]["Suggestions Channel"].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')

            var suggestions = message.content
            message.lineReplyNoMention('Thank you for your suggestion! We appreciate it!')
            message.client.channels.cache.get(suggestion_channel).send(`__**${suggestions}**__\n\u200B|───Suggestion/Feedback Provided By ${message.author}───|`)
            collector.stop()
        })
    })
}

module.exports = {
    name: 'suggest',
    description: 'lets people suggest changes to the server/bot',
    execute(channel, button, author) {

        var config = JSON.parse(fs.readFileSync('./modules/data/config.json', 'utf8'));

        messageCollector(channel, button, author, config)

    }
}