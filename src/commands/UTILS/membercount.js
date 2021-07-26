const Discord = require('discord.js');

module.exports = {
    name: 'membercount',
    description: 'member count',
    execute(client, message, args) {

        const SMC = message.guild.memberCount;

        const embed = new Discord.MessageEmbed()
            .setTitle('**Members**')
            .setDescription(`${SMC}`)
            .setTimestamp()
            .setColor("RANDOM")
        
        message.channel.send(embed);
    }
}