module.exports = {
    name: "disconnect",
    aliases: ["dc"],
    category: "music-player",
    execute(client, message) {
        const queue = message.client.queue.get(message.guild.id);
        queue.channel.leave();
        message.client.queue.delete(message.guild.id);
        return  message.channel.send('Rim disconnected from voice chat');
    }
}