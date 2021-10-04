const { canModifyQueue } = require('../../Utills/utill');
module.exports = {
    name: "disconnect",
    aliases: ["dc", "leave"],
    category: "music-player",
    execute(client, message) {
        try{
        const queue = message.client.queue.get(message.guild.id);
        if (!canModifyQueue(message.member)) return queue.textChannel.send({embed: { description: `You need to join a voice channel first!`, color: 0xFF5C58}});
        if(!queue) {
            // Nothing is playing 
            const bot = message.member.voice.channel;
            bot.leave();
            return  message.channel.send({embed: {description: 'Rim disconnected from voice chat', color: 0xE1E5EA }});
        }
        queue.channel.leave();
        message.client.queue.delete(message.guild.id);
        return  message.channel.send({embed: {description: 'Rim disconnected from voice chat', color: 0xE1E5EA }});
        }
        catch(error) {
          console.error(error.message);
        }
    }
}