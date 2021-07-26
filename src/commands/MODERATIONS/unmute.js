module.exports = {
    name: 'unmute',
    async execute(client, message, args) {

        const user = message.member

        if (!user.hasPermission(['MUTE_MEMBERS'])) return message.channel.send('You do not have permissions to run this command!'); //setting permissions
        if (!user.hasPermission(['ADMINISTRATOR'])) return message.channel.send('You do not have permissions to run this command!'); //setting permissions

        const target = message.mentions.members.first();

        if (target) {

            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted'); //defining roles


            target.roles.remove(muteRole); //removing mute

            message.channel.send(`${target} has been unmuted`); //sending msg

        } else {

            message.channel.send('Cant find that member!'); //sending error message
        }
    }
}