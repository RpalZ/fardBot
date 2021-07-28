const Discord = require("discord.js");

module.exports = {
    name: 'howgay',
    async execute(client, message, args) {

        let member = message.mentions.users.first() || message.author

        let rng = Math.floor(Math.random() * 101);

        const embed = new Discord.MessageEmbed()
            .setTitle('Gay R8 Machine')
            .setDescription(`${member.username} is ` + rng + "% Gay :rainbow_flag:")
            .setColor('RANDOM')

        message.channel.send(embed);

    }
}