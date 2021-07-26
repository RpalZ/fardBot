const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: ['av'],
    async execute(client, message, args) {

        const user = message.mentions.users.first() || message.author;

        const embed  = new Discord.MessageEmbed()
            .setTitle(`${user.tag}'s Avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 2048}))
            .setTimestamp();

        message.channel.send(embed);
    }
}