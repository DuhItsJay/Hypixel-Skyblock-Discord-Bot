const fs = require('fs')
const astralsapi = require("../../../../public/api/AstralsRefs");

module.exports = {
    name: 'channel',
    description: 'adds channel logs for each channel',
    execute(msg, args, config) {

        args.forEach( string => {
            string.charAt(0).toUpperCase() + string.slice(1)
        })
        var args = args.join(' ')
        console.log(args)

        if (config[msg.guild.id].hasOwnProperty(`Enable ${args}`)) {

            if (config[msg.guild.id][`Enable ${args}`] == 'Disabled') {
                config[msg.guild.id][`Enable ${args}`] = 'Enabled'

                fs.writeFileSync( './modules/resources/data/config.json', JSON.stringify(config, null, 4))
                msg.channel.send(`You've enabled ${args}`)
            }
            else if (config[msg.guild.id][`Enable ${args}`] == 'Enabled') {
                config[msg.guild.id][`Enable ${args}`] = 'Disabled'

                fs.writeFileSync( './modules/resources/data/config.json', JSON.stringify(config, null, 4))
                msg.channel.send(`You've disabled ${args}`)
            }
        }
        else {
            msg.channel.send('Error! Please check that you have entered the correct arguments :D.')
        }
    }
}