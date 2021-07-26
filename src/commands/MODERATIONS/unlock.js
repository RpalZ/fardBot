module.exports = {
    name: 'unlock',
    group: 'moderation',
    async execute(client, message, args) {

        const user = message.member

        if (!user.hasPermission(['MANAGE_CHANNELS'])) return message.channel.send('You do not have permissions to run this command!'); //permissions
        if (!user.hasPermission(['ADMINISTRATOR'])) return message.channel.send('You do not have permissions to run this command!'); //permissions

        let msg = await message.channel.send('Loading...'); //sending the first messgae

        try {

            message.channel.updateOverwrite(message.guilds.roles.cache.find(e => e.name.toLowerCase().trim() == '@everyone'), {

                SEND_MESSAGES: true,
                ADD_REACTIONS: true
            }) //setting the channels perms allow messages

            msg.edit('**Successfully Unlocked** the channel!') //sending the conformation message
        } catch (e) {
            console.log(e) //console logging the error
        }
    }
}