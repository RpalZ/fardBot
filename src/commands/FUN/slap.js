const fetch = require('node-fetch');
const Discord = require('discord.js')

module.exports = {
    name: 'slap',
    aliases: [],
    description: 'Hugs a user',
    cooldown: 3,
    async execute(client, message, args) {

        const Huser = args.join(" ")

        const embed = new Discord.MessageEmbed()
            .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({dynamic: true}))
            .setColor("RANDOM")
            .setDescription(`**${message.author} Slaps ${Huser}!**`)
            .setTimestamp()

        const { url } = await fetch(`https://ram.gamearoo.top/api/slap`).then(res => res.json()).catch(err => {message.reply(`https://ram.gameroo/api is not responding!`)
    
        return;
      });
      embed.setImage(url)

      message.channel.send(embed)
    }
} 