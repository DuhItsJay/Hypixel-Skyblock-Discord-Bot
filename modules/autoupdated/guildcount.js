const axios = require('axios')

function mainmemcount(channel) {
  const config = require('../../config.json')
  if (config.API['API Requests'] < config.API['Max Requests']) {
    config.API['API Requests'] = config.API['API Requests']++
  }
  axios
    .get(`https://api.hypixel.net/guild?key=${config.API['API Key']}&name=The%20Astrals`)
    .then(response => {
      channel.setName(`Astrals Members: ${Object.keys(response.data.guild.members).length}`)
    })
    .catch(error => {
      console.log(error)
    })
}
function cadetmemcount(channel) {
  const config = require('../../config.json')
  if (config.API['API Requests'] < config.API['Max Requests']) {
    config.API['API Requests'] = config.API['API Requests']++
  }
  axios
    .get(`https://api.hypixel.net/guild?key=${config.API['API Key']}&name=The%20Astrals%20Cadet%20Academy`)
    .then(response => {
      channel.setName(`Academy Members: ${Object.keys(response.data.guild.members).length}`)
    })
    .catch(error => {
      console.log(error)
    })
}

module.exports = {
  name: 'guildcount',
  description: 'gives current guild member count',
  async execute(Mainchannel, Academychannel) {
    mainmemcount(Mainchannel)
    cadetmemcount(Academychannel)
  },
}
