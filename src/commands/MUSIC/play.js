module.exports = {
     
    name: 'play',
    async execute(client, message, args) {

        if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to run that command!');

        const music = args.join(' ');

        client.distube.play(message, music)

    }
}