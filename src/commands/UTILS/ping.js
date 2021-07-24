module.exports = {
    name: 'ping',
    async execute(client, message, args, Discord) {

        //ping command is beneath

        let embed1 = new Discord.MessageEmbed() //making a embed
            .setTitle('Calculating Ping...')
            .setDescription('*This may take some time.*')
            .setColor('RANDOM')

        message.channel.send(embed1).then((resultMessage) => { //Sending 1st Embed
            
            const ping = resultMessage.createdTimestamp - message.createdTimestamp; //setting the equation to set the ping

            let embed2 = new Discord.MessageEmbed() //making the ping embed
                .setTitle('⚽ Goal!')
                .setDescription(`Latency is: **${ping}ms**`)
                .setColor('RANDOM')

            resultMessage.edit(embed2); //sending the ping embed
        })

    }
}