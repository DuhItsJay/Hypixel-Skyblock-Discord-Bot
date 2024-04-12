const fetch = require('node-fetch')
const fs = require('fs')

const createinvitelog = require('./createinvitelogs.js')

async function getWeight(UUID, key) {
  return fetch(`https://hypixel-api.senither.com/v1/profiles/${UUID}/weight/?key=${key}`)
    .then(stats => stats.json())
    .then(user => user.data.weight + user.data.weight_overflow)
    .catch(error => {
      console.log(error)
    })
}
module.exports = {
  name: 'profile',
  description: 'creates guild application profile',
  execute(id, embed, guildAppProfile, IGN, author) {
    const config = JSON.parse(fs.readFileSync('./modules/resources/data/config.json'))
    const key = config[embed.component.guild.id]['API Key']

    guildAppProfile.setThumbnail(`https://cravatar.eu/head/${id}`)
    getWeight(id, key).then(weight => {
      var truncWeight = weight.toFixed(2)
      if (truncWeight > 1750) {
        var weightreq = true
      }

      guildAppProfile
        .addFields({ name: '__**IGN**__', value: IGN }, { name: '__**Skyblock Weight**__', value: truncWeight })
        .setImage()
        .setTitle('★ __Guild Application Profile__ ★')

      embed.edit(guildAppProfile)
      createinvitelog.execute(embed, weightreq, truncWeight, IGN, author)
    })
  },
}
