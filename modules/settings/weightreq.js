const fs = require('fs')
const path = require('path')

module.exports = {
    name: 'weightreq',
    description: 'gives the ability to change weight req',
    execute(msg, args) {

        let config = JSON.parse(fs.readFileSync('./modules/data/config.json', 'utf8'));

        if (args[0] == 'set') {

            if (typeof Number(args[1]) !== 'number') {
                msg.channel.send('The requirement you have entered is not a number!')
            }
            else {
                Object.assign(config[msg.guild.id], {
                    "weight_req": args[1]
                })
                config = JSON.stringify(config, null, 4);
                const filePath = path.join(process.cwd(), './modules/data/config.json');
                try {
                    fs.writeFileSync(filePath, config);
                    msg.channel.send(`Weight requirement has been set to ${args[1]}`)
                  } catch (err) {
                    console.error(err);
                  }
                console.log('done!')
            }
        }
        else if (args[0] == 'view' || args[1] == 'check') {
            msg.channel.send(`The Current Guild Requirement Is Set At: ${config.weight_req}`)
        }
        else {
            msg.channel.send('Error! Please check that you have entered the correct arguments :D.')
        }
    }
}