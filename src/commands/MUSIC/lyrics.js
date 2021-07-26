const lyricsFinder = require('lyrics-finder');
const Discord = require('discord.js')

module.exports = {
    name: 'lyrics',
    group: 'music',
    async execute(client, message, args, Discord) {

        let singer;
        let song;
        let pages = []
        let current = 0

        const filter = msg => msg.author.id === message.author.id
        let options = {
            max: 1
        };

        message.channel.send('Q1:\n\nWho is the song artist?')
        let col = await message.channel.awaitMessages(filter, options)
        if(col.first().content == 'cancel') return message.channel.send('Cancelled')
        singer = col.first().content

        message.channel.send('Q2:\n\nWhat is the name of the song?')
        let col2 = await message.channel.awaitMessages(filter, options)
        if(col2.first().content == 'cancel') return message.channel.send("Cancelled")
        song = col2.first().content

        let res = await lyricsFinder(singer, song) || "Not Found"

        for(let i = 0; i < res.length; i += 2048) {
            let lyrics = res.substring(i, Math.min(res.length, i + 2048))
            let page = new Discord.MessageEmbed()
                .setDescription(lyrics)
                pages.push(page)
        }

        const filter2 = (reaction, user) => ["⏪", "⏩"].includes(reaction.emoji.name) && (message.author.id == user.id)
        const Embed = await message.channel.send(`Page: ${current+1}/${pages.length}`, pages[current])
        await Embed.react('⏪')
        await Embed.react('⏩')

        let ReactionCol = Embed.createReactionCollector(filter2)

        ReactionCol.on("collect", (reaction, user) => {

            reaction.users.remove(reaction.users.cache.get(message.author.id))

            if(reaction.emoji.name == '⏩') {
                if(current < pages.length - 1) {
                    current += 1
                    Embed.edit(`Page: ${current+1}/${pages.length}`, pages[current])
                }
            } else {
                if(reaction.emoji.name === '⏪') {
                    if(current !== 0) {
                        current -= 1
                        Embed.edit(`Page: ${current+1}/${pages.length}`, pages[current])
                    }
                }
            }
        })
    }
}