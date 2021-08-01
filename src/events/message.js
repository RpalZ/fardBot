const Discord = require('discord.js'),
    { prefix } = require('../json/config.json');

module.exports = (client) => {

    client.on('message', async message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return
        const args = message.content.slice(prefix.length).split(/ +/)
        const commandName = args.shift().toLowerCase()
        const command = client.commands.get(commandName) || client.commands.find(f => f.aliases && f.aliases.includes(commandName))

        try {
            await command.execute(client, message, args, Discord)
        } catch (e) {
            console.log(e)
        }
    })
}
