const Discord = require('discord.js'),
    ms = require('ms')

module.exports = {
    name: 'tempban',
    aliases: ['tban'],
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
            if (!user.hasPermission(['BAN_MEMBERS'])) return message.channel.send('You do not have permissions to run this command!')
            if (!message.guild.me.hasPermission(['BAN_MEMBERS'])) return message.channel.send('I do not have permissions to `BAN_MEMBERS`')

            const mg = await message.channel.send(new Discord.MessageEmbed()
                .setTitle('How long you want to ban that user?')
                .setDescription('You can format it as: `10d 3h 5m 2s`')
                .setColor('RANDOM')
            )
            const msgAwait = await message.channel.awaitMessages((usr) => usr.author.id === user.id, { max: 1 })
            const response = msgAwait.first().content
            const duration = response.split(/ +/).reduce((acc, cur) => {
                acc += ms(cur)
                return acc
            }, 0)
            if (isNaN(duration)) return message.channel.send('Duration is invalid. Try again.')

            const bannedMember = await mentioned.ban({ reason })
            mg.delete()

            const embed = new Discord.MessageEmbed()
                .setTitle(`You have been banned temporarily from ${message.guild.name} by ${user.user.username} for ${ms(duration, { long: true })}`)
                .setDescription(`Reason: ${reason}`)
                .setColor('RANDOM')
                .setFooter(`${client.user.username} | Made by ${owner.tag}`, client.user.displayAvatarURL({ size: 4096, format: 'png', dynamic: true }))
                .setTimestamp()

            bannedMember.user.send(embed)
            message.channel.send(`${bannedMember} has successfully been temporarily banned for \`${response}\`.`)

            //unbanning
            setTimeout(async () => {
                const invite = await message.channel.createInvite({
                    maxAge: 0
                })
                message.guild.members.unban(bannedMember.user.id)
                bannedMember.user.send(
                    embed
                        .setTitle(`Your temporary ban in ${message.guild.name} is over you may now join again`)
                        .setDescription(`Here is the link back to the server: ${invite.url}`)
                )

            }, duration);

        } catch (e) {
            console.log(e)
            if (e.httpStatus == 403) return message.channel.send('It seems that I cannot ban that member.')
        }


    }
}