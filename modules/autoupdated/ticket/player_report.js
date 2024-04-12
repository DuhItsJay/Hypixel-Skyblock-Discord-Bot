const Discord = require('discord.js')
const fs = require('fs')

var questions = ['Please enter the IGN of the player you are reporting', 'What activity is this player suspicious for?']

function messageCollector (channel, button, author, config) {

    let report_builder = [];
    
    button.reply.send(questions[0]).then( msg => {
        const collector = new Discord.MessageCollector(channel, m => m.author.id === author.id, { time: 60000, max: 1, errors: ['Timed Out'] });
        collector.on('collect', message => {
            var content = message.content
            report_builder.push(content)
            collector.stop()
            message.lineReplyNoMention(questions[1]).then( next => {
                const collector = new Discord.MessageCollector(channel, m => m.author.id === author.id, { time: 60000, max: 1, errors: ['Timed Out'] });
                collector.on('collect', message => {
                    var content = message.content
                    report_builder.push(content)

                    var admin = message.guild.roles.cache.find(role => role.name === 'Admin')
                    var reports_channel = config[message.guild.id]["logs"]["Reports Channel"].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')

                    message.lineReplyNoMention("A report has been submitted. Please wait for the staff team review this. Don't forget to have evidence to back your claims!")
                    message.client.channels.cache.get(reports_channel).send(`${admin}\n**\u200B**\n__**Suspected Player:**__ ${report_builder[0]}\n__**Reason:**__ ${report_builder[1]}\n\u200B|───Case Investigation Request By ${message.author}───|`)
                    collector.stop()
                })
            })
        })
    })
}

module.exports = {
    name: 'player_report',
    description: 'lets people report suspicious activity',
    execute(channel, button, author) {

        var config = JSON.parse(fs.readFileSync('./modules/data/config.json', 'utf8'));

        messageCollector(channel, button, author, config)
    }
}