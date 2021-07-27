module.exports = {
    
    name: 'stop',
    async execute(client, message, args) {

        if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to run that command!');

        let queue = await client.distube.getQueue(message)

        if (queue) {

            client.distube.stop(message)
            message.channel.send('Stopped the song!');
        } else if (!queue) {
            return
        }
    }
}