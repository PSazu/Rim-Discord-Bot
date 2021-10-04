const { canModifyQueue } = require('../../Utills/utill');
module.exports = {
    name: 'skip',
    aliases: ['ps'],
    category: 'music-player',
    execute(client, message) {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.reply({embed: { description: 'There is nothing playing that I could skip for you.', color: 0xFF5C58 }});
        if (!canModifyQueue(message.member)) return queue.textChannel.send(`You need to join a voice channel first!`);
        queue.playing = true;
        queue.connection.dispatcher.end();
        queue.textChannel.send("`"+ `${message.author.tag}`+ "` " + ` ⏭ ` + `skipped the song`);
    }
}