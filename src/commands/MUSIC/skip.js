module.exports = {
    name: 'skip',
    async execute(client, message, args) {

        if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to run that command!');

        client.distube.skip(message);

        message.channel.send('Skipped the song!')
    }
}