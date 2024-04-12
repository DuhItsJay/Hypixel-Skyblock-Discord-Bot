const fs = require('fs')

module.exports = {
    name: 'weightreq',
    description: 'gives the ability to change weight req',
    execute(msg, args) {

        let config = JSON.parse(fs.readFileSync('./modules/data/config.json', 'utf8'));

        var key = config[msg.guild.id]["API Key"]

        const embed = astralsapi.embed
        .spliceFields(0, 25);

        if (config["Guild"]["Guild Name"] == 'Not Set') {

        }
        else  {
            
        }
    }
}