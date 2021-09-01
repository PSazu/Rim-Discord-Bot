const { canModifyQueue } = require('../Utills/utill');

module.exports = {
  name: "pause",
  execute(client, message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply('There is nothing playing');
    if (!canModifyQueue(message.member)) return queue.textChannel.send(`You need to join a voice channel first!`);
    if (queue.playing) {
        queue.playing = false;
        queue.connection.dispatcher.pause(true); 
        return queue.textChannel.send('Paused ⏸️');
    }

  }
}