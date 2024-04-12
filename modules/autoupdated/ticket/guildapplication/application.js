const fetch = require('node-fetch')
const Discord = require('discord.js')

const sharpBlue = '#0e4eb2'
const calmPurple = '#574982'

const profile = require('./sub_functions/profile.js')

async function messageCollector(button, author, redisClient) {
	const astrals = button.clicker.member.guild.roles.cache.find(role => role.id === '880788027243397150')
	const waitinglist = button.clicker.member.guild.roles.cache.find(role => role.id === '858352467263488041')

	let roles = button.clicker.member._roles

	if (roles.includes(astrals['id'])) {
		button.reply.send('Oops! You are already in the guild!')
		return
	} else if (roles.includes(waitinglist['id'])) {
		button.reply.send('You have already applied and have been placed on the waiting list! Please be patient - you will be pinged when a spot is open')
		return
	} else {
		redisClient.get(author.id, function (err, reply) {
			var json = JSON.parse(reply)
			buildprofile(button, json, author)
		})
	}
}

function buildprofile(button, json, author) {
	const guildAppProfile = new Discord.MessageEmbed()
		.setTitle('★ __ Loading Guild Application Profile__ ★')
		.setColor(calmPurple)
		.setFooter('Created by DuhItsJay')
		.setTimestamp()
		.setImage('https://www.designyourway.net/blog/wp-content/uploads/2017/11/0-D1icAJvr19HzVBd6.gif')

	button.reply.send(guildAppProfile).then(embed => {
		var uuid = Object.keys(json).shift()
		var ign = json[uuid].username
		profile.execute(uuid, embed, guildAppProfile, ign, author)
	})
}

module.exports = {
	name: 'application',
	description: 'handles application button queries',
	execute(button, author, redisClient) {
		messageCollector(button, author, redisClient)
	},
}
