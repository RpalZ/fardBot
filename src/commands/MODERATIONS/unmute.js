module.exports = {
    name: 'unmute',
    async execute(client, message, args){

        if (!user.hasPermission(['MUTE_MEMBERS'])) return message.channel.send('You do not have permissions to run this command!'); //setting permissions
        if (!user.hasPermission(['ADMINISTRATOR'])) return message.channel.send('You do not have permissions to run this command!'); //setting permissions
        
        const target = message.mentions.users.first();
        
        if(target){
            
            let mainRole = message.guild.roles.cache.find(role => role.name === 'Member'); //defining roles
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted'); //defining roles
 
            let memberTarget= message.guild.members.cache.get(target.id);
 
            memberTarget.roles.remove(muteRole.id); //removing mute
            memberTarget.roles.add(mainRole.id); //adding main role
            message.channel.send(`<@${memberTarget.user.id}> has been unmuted`); //sending msg

        } else {

            message.channel.send('Cant find that member!'); //sending error message
        }
    }
}