const fs = require('fs')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const Discord = require('discord.js')

const mayor_stats = require('../resources/constants/mayor')
const astralsapi = require('../api/AstralsRefs')

function getMayor(msg) {
  return fetch('https://hypixel-skyblock.fandom.com/wiki/Mayor_Election')
    .then(data => data.text())
    .then(function (html) {
      const $ = cheerio.load(html)
      var curr_Mayor = $('tr:nth-child(2) > td:nth-child(3) > a')[0].children[0].data.trim()
      var curr_Perks = $('tr:nth-child(2) > td:nth-child(5)')[0].children[0].data.trim()
      var curr_Year = $('tr:nth-child(2) > td:nth-child(2)')[0].children[0].data.trim()

      var curr_mayor_stats = mayor_stats.mayors[curr_Mayor]

      const calender = JSON.parse(fs.readFileSync('./modules/resources/data/calender_data.json'))

      let base_time = calender.prev_year_unix
      let unix = Math.floor(Date.now() / 1000)
      let secondsSinceLastLog = unix - base_time

      if (secondsSinceLastLog >= calender['events']['Election Boot Opens'] || secondsSinceLastLog <= calender['events']['Election Over']) {
        const embed = new Discord.MessageEmbed()
          .setThumbnail(curr_mayor_stats.skin_image)
          .setTitle(`Skyblock Year ${curr_Year} - Mayoral Elections`)
          .setDescription(`__${curr_Mayor} is winning with perks:__`)

        var mayor_perks = curr_mayor_stats.perks

        embed.spliceFields(0, 25)

        if (curr_Perks == 'All' || curr_Perks == 'all') {
          for (var p in mayor_perks) {
            embed.addField(p, mayor_perks[p], true)
          }
        } else {
          var split_perks = curr_Perks.split(',')
          var curr_perks = Object.keys(mayor_perks)
          var perks = []

          split_perks.forEach(perk => {
            perk = perk - 1
            perks.push(curr_perks[perk])
          })

          for (i = 0; i < perks.length; i++) {
            embed.addField(perks[i], mayor_perks[perks[i]], true)
          }
        }

        msg.channel.send(embed)
      } else {
        var embed = new Discord.MessageEmbed()
          .setThumbnail(curr_mayor_stats.skin_image)
          .setTitle(`Skyblock Year ${curr_Year} - Mayoral Elections`)
          .setDescription(`__The election boot has closed. ${curr_Mayor} is currently in office with perks:__`)

        var mayor_perks = curr_mayor_stats.perks

        embed.spliceFields(0, 25)

        if (curr_Perks == 'All' || curr_Perks == 'all') {
          for (var p in mayor_perks) {
            embed.addField(p, mayor_perks[p], true)
          }
        } else {
          var split_perks = curr_Perks.split(',')
          var curr_perks = Object.keys(mayor_perks)
          var perks = []

          split_perks.forEach(perk => {
            perk = perk - 1
            perks.push(curr_perks[perk])
          })

          for (i = 0; i < perks.length; i++) {
            embed.addField(perks[i], mayor_perks[perks[i]], true)
          }
        }

        msg.channel.send(embed)
      }
    })
    .catch(function (err) {
      console.log(err)
    })
}

module.exports = {
  name: 'elections',
  description: 'upcoming mayor',
  execute(msg, args) {
    console.log(args[0] == undefined)
    if (args[0] == undefined) {
      getMayor(msg)
    }
  },
}
