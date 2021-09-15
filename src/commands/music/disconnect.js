const { canModifyQueue } = require('../../Utills/utill');
module.exports = {
    name: "disconnect",
    aliases: ["dc"],
    category: "music-player",
    execute(client, message) {
        try{
        const queue = message.client.queue.get(message.guild.id);
        if(!queue) {
            // Nothing is playing 
            const bot = message.member.voice.channel;
            bot.leave();
            return  message.channel.send('Rim disconnected from voice chat');
        }
        if (!canModifyQueue(message.member)) return queue.textChannel.send(`You need to join a voice channel first!`);
        queue.channel.leave();
        message.client.queue.delete(message.guild.id);
        return  message.channel.send('Rim disconnected from voice chat');
        }
        catch(error) {
          console.error(error.message);
        }
    }
}