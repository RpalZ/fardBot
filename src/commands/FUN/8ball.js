const Discord = require('discord.js')

module.exports = {
    name: '8ball',
    async execute(client, message, args) {

        if(!args[0]) return message.channel.send('Please ask a question!')
        let replies = ['Yes', 'Outlook seems good.', 'Of course', 'Definitely', 'No', 'Better to not tell now.', 'Outlook seems bad', 'As I see it yes', 'Dont count on it', 'Sources say yes', 'Sources say no', 'Most likely', 'Without a doubt', 'Cant predict as of now', 'Ask again later']

        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice().join(' ');

        let embed = new Discord.MessageEmbed()
            .setTitle('**:8ball: Ball Answer Generator!**')
            .setColor('RANDOM')
            .addField('Question', question)
            .addField('My Reply', replies[result])

            message.channel.send(embed)
    }
}
