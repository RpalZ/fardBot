module.exports = {
    name: 'volume',
    aliases: ['vol'],
    async execute(client, message, args) {

        client.distube.setVolume(message, args[0]);

        message.channel.send(`Set volume to **${args[0]}%**`)

    }
}