const Discord = require('discord.js'),
    _ = require('lodash')

module.exports = {
    name: 'banlist',
    aliases: ['bans', 'listbans'],
    group: 'moderation',
    async execute(client, message, args) {

        try {

            const guild = message.guild
            const user = message.member
            const owner = await client.users.fetch('378233764792238081')
            const banList = await guild.fetchBans()
            const banListChunk = _.chunk([...banList.values()], 8)

            if (!banListChunk[0]) return message.channel.send('There are no banned users in this guild.')

            let index = 0
            const embed = new Discord.MessageEmbed()
                .setTitle(`Banned Users in ${guild.name} `)
                .setColor("RANDOM")
                .setAuthor(user.user.username, user.user.displayAvatarURL({ size: 4096, format: 'png', dynamic: true }))

            function editEmbed(index) {

                const border = '- '.padEnd(123, '- ')

                embed
                    .setDescription(
                        `**${border}**\n${banListChunk[index].map((m, i) => {
                            return `> \`[${i + 1 + (index * 8)}] ${m.user.username}\` **(${m.user.id})**`
                        }).join('\n')}\n**${border}**`
                    )
                    .setFooter(`Page ${index + 1}/${banListChunk.length} of ${banList.size} users | ${client.user.username} | Made by ${owner.tag}`, client.user.displayAvatarURL({ size: 4096, format: 'png', dynamic: true }))
            }

            editEmbed(index)

            const emoji = ['◀️', '▶️', '❌',]
            const msg = await message.channel.send(embed)
            const collector = msg.createReactionCollector((r, u) => u.id == user.user.id && emoji.includes(r.emoji.name))
            collector.on('collect', (react, user) => {
                try {
                    switch (react.emoji.name) {
                        case '◀️':
                            editEmbed(index - 1)
                            index--
                            break;
                        case '▶️':
                            editEmbed(index + 1)
                            index++
                            break;
                        case '❌':
                            msg.delete()
                            collector.stop()
                            break;
                        default:

                    }
                    react.users.remove(user.id)
                    msg.edit(embed)
                } catch (e) {
                    react.users.remove(user.id)
                }
            })
            emoji.map(m => msg.react(m))
        } catch (e) {
            console.log(e)
        }


    }
}