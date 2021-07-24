const Discord = require('discord.js'),
    axios = require('axios')

module.exports = {
    name: 'football',
    usage: '{QUERY:optional}',
    async execute(client, message, args) {
        const query = args.slice(0).join(' ')
        const url = !args[0] ? `https://reddit.com/r/soccer/.json` : `https://reddit.com/r/soccer/search/.json`
        const nsfw = message.channel.nsfw ? '1' : '0'
        const emoji = ['⬅️', '⏪', '◀️', '▶️', '⏩', '➡️', '❌']

        try {



            const mg = await message.channel.send('Fetching your request...')
            let result = await axios.get(url, {
                params: {
                    q: query,
                    nsfw,
                    restrict_sr: '1',
                    include_over_18: nsfw == 1 ? 'on' : 'off',
                    sort: 'relevance'
                }
            })
            let res = result.data.data.children

            let index = 0
            // console.log(result.data.data.after)
            const embed = new Discord.MessageEmbed().setColor('RANDOM')
            function editEmbed(index) {
                embed.setFooter(
                    `
                👍 ${res[index].data.ups} | 👎 ${res[index].data.downs} | 💬 ${res[index].data.num_comments} | Post ${index + 1}/${res.length}
                `
                )
                if (res[index].data.over_18 && !message.channel.nsfw) {
                    embed
                        .setTitle("[NSFW]")
                        .setURL('')
                        .setImage('https://redi.eu/wp-content/uploads/2015/08/not-available.png')
                } else {
                    embed
                        .setTitle(res[index].data.title.substring(0, 256))
                        .setURL(`https://reddit.com${res[index].data.permalink}`)
                        .setImage(res[index].data.url)
                }

            }
            editEmbed(index)
            const msg = await message.channel.send(embed)
            mg.delete()
            const collector = msg.createReactionCollector((r, u) => u.id == message.author.id && emoji.includes(r.emoji.name))
            collector.on('collect', async (react, user) => {
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
                        case '⏩':
                            let i = 5
                            !res[index + i] && (i = (res.length - 1) - index)
                            editEmbed(index + i)
                            index += i
                            break;
                        case '⏪':
                            let b = 5
                            !res[index - b] && (b = index)
                            editEmbed(index - b)
                            index -= b
                            break;
                        case '⬅️':
                            const res1 = await axios.get(url, {
                                params: {
                                    q: query,
                                    nsfw,
                                    before: result.data.data.before,
                                    restrict_sr: '1',
                                    count: '10',
                                    include_over_18: nsfw ? 'on' : 'off',
                                    sort: 'relevance'
                                }
                            })
                            console.log(result.data.data.before)
                            result = res1
                            res = res1.data.data.children
                            index = 0
                            editEmbed(index)
                            break;
                        case '➡️':
                            const res2 = await axios.get(url, {
                                params: {
                                    q: query,
                                    nsfw,
                                    after: result.data.data.after,
                                    restrict_sr: '1',
                                    count: '10',
                                    include_over_18: nsfw ? 'on' : 'off',
                                    sort: 'relevance'
                                }
                            })
                            result = res2
                            res = res2.data.data.children
                            index = 0
                            editEmbed(index)
                            break;
                        case '❌':
                            msg.delete()
                            collector.stop()
                            break;
                        default:

                    }
                    msg.edit(embed)
                    react.users.remove(user.id)
                } catch (e) {
                    react.users.remove(user.id)
                }
            })
            emoji.map(m => msg.react(m))
        } catch (e) {
            // console.log(e)
            let code = e.message.slice(-3)
            code == 'ned' && (code = '404')
            message.channel.send(`Cannot fetch your requested content | code: ${code}`)
        }

    }
}