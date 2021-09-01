const { canModifyQueue } = require('../Utills/utill');

module.exports = {
    name: "stop",
    execute(message) {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.reply('There is nothing playing');
        if (!canModifyQueue(member)) return message.reply('You need to join a voice channel first!');

        queue.songs = [];
        try {
        queue.connection.dispatcher.end();
        queue.textChannel.send("`"+`${user.username} `+ "` " + `⏹` + ` stopped the music!`);
        }
        catch(error) {
            console.error(error);
            queue.connection.disconnect();
        }
    }
}