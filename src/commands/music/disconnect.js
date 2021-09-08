module.exports = {
    name: "disconnect",
    aliases: ["dc"],
    category: "music-player",
    execute(client, message) {
        const queue = message.client.queue.get(message.guild.id);
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