const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'hug',
    aliases: [],
    description: 'Hugs a user',
    cooldown: 3,
    async execute(client, message, args) {

        let Huser = args.join(' ')
        
        const embed = new Discord.MessageEmbed()
            .setFooter(`Requested By: ${message.author.tag}`, message.author.avatarURL({dynamic: true}))
            .setColor("RANDOM")
            .setDescription(`${message.author} Hugs ${Huser}!`)
            .setTimestamp()

        const { url } = await fetch(`https://ram.gamearoo.top/api/hug`).then(res => res.json()).catch(err => {message.reply(`https://ram.gameroo/api is not responding!`)
    
        return;
      });
      embed.setImage(url)

      message.channel.send(embed)
    }
}   
