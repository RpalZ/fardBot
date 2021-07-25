const ms = require('ms')

module.exports = {
    name: 'mute',
    usage: '{MEMBER} {TIME}',
    group: 'moderation',
    async execute(client, message, args) {

        if (!user.hasPermission(['MUTE_MEMBERS'])) return message.channel.send('You do not have permissions to run this command!'); //setting permissions
        if (!user.hasPermission(['ADMINISTRATOR'])) return message.channel.send('You do not have permissions to run this command!'); //setting permissions

        const target = message.mentions.users.first(); //Getting the user so we can mute

        if (target) {

            let mainRole = message.guild.roles.cache.find(role => role.name === 'community'); //setting the main role of the server
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted'); //setting the muted role of the server

            let targetmember = message.guild.members.cache.get(target.id); //getting targets id

            if (args[1]) {

                targetmember.roles.remove(mainRole.id); //removing main role
                targetmember.roles.add(muteRole.id); //adding mute roke
                message.channel.send(`<@${memberTarget.user.id}> has been muted`); //sending conformation that user has been muted
                return
            }
            targetmember.roles.remove(mainRole.id); //removing main role
            targetmember.roles.add(muteRole.id); //adding mute role
            message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`); //sending conformation that user has been muted for x amount of time

            setTimeout(function () {
                targetmember.roles.remove(mainRole.id); //removing main role
                targetmember.roles.add(muteRole.id); //adding mute role
            }, ms(args[1]));
        } else {
            message.channel.send('That user is not in this guild!') //sending error message
        }
    }
}