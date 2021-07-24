const Discord = require('discord.js')

module.exports = {
    name: 'kick',
    usage: '{MEMBER} {REASON}',
    group: 'moderation',
    async execute(client, message, args) {
        try {
            const user = message.member
            const mentioned = message.mentions.members.first()
            const reason = args.slice(1).join(' ') || 'No Reason.'

            const owner = await client.users.fetch('378233764792238081')
            //checking
            if (!mentioned) return message.channel.send('Please specify a user that exist in this guild.')
            if (!user.hasPermission(['KICK_MEMBERS'])) return message.channel.send('You do not have permissions to run this command!')
            if (!message.guild.me.hasPermission(['KICK_MEMBERS'])) return message.channel.send('I do not have permissions to `KICK_MEMBERS`')

            const kickedMember = await mentioned.kick(reason)

            const embed = new Discord.MessageEmbed()
                .setTitle(`You have been kicked from ${message.guild.name} by ${user.user.username}`)
                .setDescription(`Reason: ${reason}`)
                .setColor('RANDOM')
                .setFooter(`${client.user.username} | Made by ${owner.tag}`, client.user.displayAvatarURL({ size: 4096, format: 'png', dynamic: true }))
                .setTimestamp()

            kickedMember.user.send(embed)
            return message.channel.send(`${kickedMember} has successfully been kicked.`)

        } catch (e) {
            console.log(e)
            if (e.httpStatus == 403) return message.channel.send('It seems that I cannot kick that member.')
        }


    }
}