const { canModifyQueue } = require('../../Utills/utill');

module.exports = {
    name: "disconnect",
    aliases: ["dc"],
    category: "music-player",
    execute(client, message) {
        const queue = message.client.queue.get(message.guild.id);
        if (!canModifyQueue(message.member)) return queue.textChannel.send(`You need to join a voice channel first!`);
        try{
        queue.channel.leave();
        message.client.queue.delete(message.guild.id);
        return  message.channel.send('Rim disconnected from voice chat');
        }
        catch(error) {

            console.error("Something went wrong in disconnect command", error.message);
        }
    }
}