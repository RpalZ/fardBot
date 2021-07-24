const Discord = require('discord.js')

module.exports = {
    name: 'unban',
    usage: "{user:ID}",
    group: "moderation",
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send('Please provide the user ID to unban.')
        try {

            const [initUSERID] = args
            const USERID = initUSERID.split('<@!').filter(m => m)[0].split('>').filter(m => m)[0]
            const guild = message.guild
            const author = message.member

            //checking permissions
            if (!author.hasPermission(['BAN_MEMBERS'])) return message.channel.send('You do not have permissions to run this command!')
            if (!message.guild.me.hasPermission(['BAN_MEMBERS'])) return message.channel.send('I do not have permissions to `BAN_MEMBERS`')

            const owner = await client.users.fetch('378233764792238081')
            const bannedUsers = await guild.fetchBans()
            const bannedUser = bannedUsers.get(USERID)
            if (!bannedUser) return message.channel.send('User does not exist in the ban list. Make sure you are sending the ID of the user.')
            const unbannedUser = await guild.members.unban(bannedUser.user.id)
            message.channel.send(`${unbannedUser} has successfully been unbanned.`)
            const invite = await message.channel.createInvite({
                maxAge: 0
            })
            unbannedUser.send(
                new Discord.MessageEmbed()
                    .setTitle(`You have been unbanned in ${guild.name} by ${author.user.username}`)
                    .setDescription(`Here is the link back to the server: ${invite.url}`)
                    .setColor('RANDOM')
                    .setAuthor(author.user.username, author.user.displayAvatarURL({ size: 4096, format: 'png', dyanmic: true }))
                    .setFooter(`${client.user.username} | Made by ${owner.tag}`, client.user.displayAvatarURL({ size: 4096, format: 'png', dyanmic: true }))
            )
        } catch (e) {
            console.log(e)
        }
    }
}