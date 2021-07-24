const fs = require('fs')
const _ = require('lodash')
const Discord = require('discord.js')
const { prefix } = require('../../json/config.json')


module.exports = {
    name: 'help',
    async execute(client, message, args,) {
        const commandDirs = fs.readdirSync(`./src/commands/`).reduce((acc, cur) => {
            const commandFiles = fs.readdirSync(`./src/commands/${acc}`).filter(m => m.endsWith('.js')).slice(0, -3)
            acc[cur] = commandFiles
            return acc
        }, {})

        const author = message.author

        const embedMain = new Discord.MessageEmbed()
            .setTitle(`Commands [${client.commands.size}]`)
            .setColor('RANDOM')
            .setAuthor(author.username, author.displayAvatarURL({ size: 4096, format: 'png', dynamic: true }))
            .setFooter(client.user.username, client.user.displayAvatarURL({ size: 4096, format: 'png', dynamic: true }))

        for (const dir in commandDirs) {
            embedMain.addField(`${dir} [${commandDirs[dir].length}]`, `\`\`\`${prefix}help ${dir}`)
        }

        if (!args[0] || !Object.keys(commandDirs).includes(args[0])) return message.channel.send(embedMain)


    }
}