const fs = require('fs')
const _ = require('lodash')
const Discord = require('discord.js')
const { prefix } = require('../../json/config.json')


module.exports = {
    name: 'help',
    async execute(client, message, args,) {

        console.log('he')
        const cmdDir = fs.readdirSync('./src/commands/').sort().reduce((acc, cur) => {
            let fileNames = fs.readdirSync(`./src/commands/${cur}`).filter(f => f.endsWith('.js')).map(m => m.slice(0, -3))
            acc[cur] = fileNames
            return acc
        }, {})
        delete cmdDir.commandjsonfiles

        const embed = new Discord.MessageEmbed()
            .setTitle(`Commands [${client.commands.size}]`)
            .setColor('BLACK')
            .setFooter(
                `${client.user.username}`,
                client.user.displayAvatarURL({ size: 4096, format: 'png', dynamic: true }))
            .setAuthor(message.author.username, message.author.displayAvatarURL({ size: 4096, dynamic: true, format: 'png' }))


        for (const cmd in cmdDir) {
            embed.addField(`[${cmdDir[cmd].length}] ${cmd}`, `\`\`\`${prefix}help ${cmd.toLowerCase()}\`\`\``, true)
        }
        if (!args[0]) return message.channel.send(embed)
        //this is when they specify category
        try {


            if (Object.keys(cmdDir).includes(args[0].toUpperCase())) {
                const limit = 5
                let index = 0
                function editEmbed(embed, index) {
                    const chunkCommands = _.chunk(cmdDir[args[0].toUpperCase()], limit)
                    const selectedCommands = chunkCommands[index]
                    if (!selectedCommands) throw new Error('These commands are coming soon!')



                    embed
                        .setFooter(
                            `Page ${index + 1}/${chunkCommands.length} of ${cmdDir[args[0].toUpperCase()].length} commands | ${client.user.username}`
                            , client.user.displayAvatarURL({ size: 4096, format: 'png', dynamic: true }))
                        .setDescription(selectedCommands.map((m, i) => {
                            let command = require(`../${args[0].toUpperCase()}/${m}`)
                            const capital = command.name.toUpperCase()[0] + command.name.slice(1)
                            const PREFIX = prefix
                            const usage = command.usage || ''

                            // console.log(command)
                            return `**{${i + 1 + (index * 5)}}** \`${capital}\`
             \`\`\`${PREFIX}${command.name} ${usage}\`\`\``

                        }))
                }
                const subCmdEmbed = new Discord.MessageEmbed()
                    .setTitle(`${args[0].toUpperCase()} commands`)
                    .setColor('RANDOM')
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ size: 4096, dynamic: true, format: 'png' }))
                editEmbed(subCmdEmbed, index)

                const msg = await message.channel.send(subCmdEmbed)
                const collector = msg.createReactionCollector((react, user) => user.id == message.author.id && ['⬅️', '➡️', '❌'].includes(react.emoji.name))
                collector.on('collect', (react, user) => {
                    try {
                        if (react.emoji.name == '⬅️') {
                            editEmbed(subCmdEmbed, index - 1)
                            react.users.remove(message.author.id)
                            msg.edit(subCmdEmbed)
                            index--
                        } else if (react.emoji.name == '➡️') {
                            editEmbed(subCmdEmbed, index + 1)
                            react.users.remove(message.author.id)
                            msg.edit(subCmdEmbed)
                            index++
                        } else {
                            msg.delete()
                            collector.stop()
                            return
                        }
                    } catch (e) {
                        react.users.remove(message.author.id)
                    }

                })
                msg.react('⬅️')
                msg.react('➡️')
                msg.react('❌')
            } else {
                return message.channel.send(embed)
            }
        } catch (e) {
            console.log(e)
            return message.channel.send(e.message)
        }

    }
}