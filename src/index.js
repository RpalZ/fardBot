
const Discord = require('discord.js'),
    client = new Discord.Client(),
    config = require('./json/config.json'),
    fs = require('fs'),
    distube = require('distube');


//initializing events
const events = fs.readdirSync(`${__dirname}/events`).filter(f => f.endsWith('.js'))
events.forEach((val, i) => {
    require(`./events/${val}`)(client)
})

//initializing cmds into discord collection
client.commands = new Discord.Collection()

//distube
client.distube = new distube(client, { searchSongs: false, emitNewSongOnly: true });
client.distube.on("playSong", (message, queue, song) => message.channel.send(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested By: ${song.user}`))
client.distube.on("addSong", (message, queue, song) => message.channel.send(`Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue by ${song.user}`));

fs.readdirSync(`${__dirname}/commands`).forEach((val, i, arr) => {
    fs.readdirSync(`${__dirname}/commands/${val}/`).filter(m => m.endsWith('js')).forEach((v, k) => {
        const cmd = require(`${__dirname}/commands/${val}/${v}`)
        client.commands.set(cmd.name, cmd)
    })
})


console.table(client.commands.map(m => m.name))

client.on('ready', () => {

    const AoS = [
        `f!help`,
        `Watching this server!`,
        `Helping people!`
    ];

    let index = 0;
    setInterval(() => {
        if(index === AoS.length) index = 0;
        const status = AoS[index];
        client.user.setActivity(status, { type: 'PLAYING' }).catch(console.error)
    }, 15000);
})

client.login(config.botToken)