//Auto assign "Guest" role when a member joins the discord server
AstralsBot.on('guildMemberAdd', guildMember => {
	const GuestRole = guildMember.guild.roles.cache.findKey(role => role.id === '842899724754354196')

	const verified = guildMember.guild.roles.cache.findKey(role => role.id === '871752012272918588')

	redisClient.GET(guildMember.id, function (err, reply) {
		if (reply != null) {
			guildMember.roles.add(GuestRole)

			guildMember.roles.add(verified)
		} else {
			guildMember.roles.add(GuestRole)
		}
	})
})

AstralsBot.on('message', msg => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return
	const args = msg.content.slice(prefix.length).trim().split(/ +/)
	const command = args.shift()
	if (!AstralsBot.commands.has(command)) return
	try {
		//Executes said command
		AstralsBot.commands.get(command).execute(msg, args, redisClient)
	} catch (error) {
		console.error(error)
	}
})

//Staff Commands
const config_bot = require('../modules/staffcommands/config')
const settings = require('../modules/staffcommands/settings')
const guild = require('../modules/staffcommands/guild')

AstralsBot.on('message', msg => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return
	let allowedRole = msg.member.roles.cache.some(role => role.id === '840775248458547210')
	if (allowedRole) {
		const args = msg.content.slice(prefix.length).trim().split(/ +/)
		const command = args.shift()

		if (command == 'settings') {
			settings.execute(msg, args)
		} else if (command == 'purge') {
			const deleteCount = parseInt(args[0], 10)

			if (!deleteCount || deleteCount < 1 || deleteCount > 100) return

			msg.delete()
			msg.channel.bulkDelete(deleteCount + 1).catch(error => msg.reply(`Couldn't delete messages because of: ${error}`))
		} else if (command == 'config') {
			config_bot.execute(msg, args)
		} else if (command == 'guild') {
			//guild.execute(msg, args)
		}
	}
})

//Log onto Discord
AstralsBot.login(token)

const transcript = require('discord-transcript')

AstralsBot.on('message', async message => {
	let channel = message.channel

	let messagecollection = message.channel.messages.fetch({
		limit: 100,
	})

	let link = transcript.generate(message, messagecollection, channel)

	return message.channel.send(link)
})
