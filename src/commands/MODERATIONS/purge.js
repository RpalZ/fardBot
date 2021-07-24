module.exports = {
    name: 'purge',
    async execute(client, message, args) {

        if (!user.hasPermission(['MANAGE_MEMBERS'])) return message.channel.send('You do not have permissions to run this command!'); //setting permissions

        if(!args[0]) return message.channel.send('Specify a number between 1 and 1000!'); //asking for a number to purge
        if(isNaN(args[0])) return message.channel.send('Enter a **number**') //asking for a number
        if(parseInt(args[0]) > 1000) return message.channel.send('You can only delete **1000** messages at one time') //setting a limit

            await message.channel.bulkDelete(parseInt(args[0]) + 1).catch(err =>
                console.log(err)) //deleting msgs and catching errors
            
        message.channel.send(`Deleted **${args[0]}** messages!`).then(m => m.delete({ timeout: 8000})) //sending and deleting the conformation message //8 secs then msg will delete

    }
}