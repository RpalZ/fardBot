const ms = require('ms')

module.exports = {
    name: 'mute',
    usage: '{MEMBER} {TIME:0d 0hr 0m 0s}',
    group: 'moderation',
    async execute(client, message, args) {

        const user = message.member

        if (!user.hasPermission(['MUTE_MEMBERS'])) return message.channel.send('You do not have permissions to run this command!'); //setting permissions
        if (!user.hasPermission(['ADMINISTRATOR'])) return message.channel.send('You do not have permissions to run this command!'); //setting permissions

        const guild = message.guild

        const target = message.mentions.members.first(); //Getting the user so we can mute
        const initDuration = args.slice(1).join(' ')
        const duration = initDuration && initDuration.split(' ').reduce((acc, cur) => {
            acc += ms(cur)
            return acc
        }, 0) || 0
        if (isNaN(duration)) return message.channel.send('Please send a valid duration in the format: `0d 0hr 0m 0s`')


        if (!target) return message.channel.send('That user is not in this guild!'); //se


        const mutedRole = guild.roles.cache.find(m => m.name == 'Muted') || await guild.roles.create({
            data: {
                name: 'Muted',
                position: 10,
                hoist: false,
                mentionable: false

            },
        }
        )

        await target.roles.add(mutedRole, 'Man has been muted Down Bad!')

        guild.channels.cache.map(m => {
            m.updateOverwrite(mutedRole, {
                SEND_MESSAGES: false
            })
        })


        message.channel.send(duration > 0 ? `${target} has been muted for ${initDuration}.` : `${target} has been muted.`)

        duration > 0 && setTimeout(async () => {
            await target.roles.remove(mutedRole, 'Man has been unmuted still down bad!')
        }, duration)

    }
}