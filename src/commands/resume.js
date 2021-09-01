const { canModifyQueue } = require('../Utills/utill');
module.exports = {
  name: "resume",
  aliases: ["r"],
  category: 'music-player',
  execute(client, message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply('There is nothing playing ❌');
    if (!canModifyQueue(message.member)) return queue.textChannel.send(`You need to join a voice channel first!`);
    if (!queue.playing) {
        queue.playing = true;
        queue.connection.dispatcher.resume();
        return  queue.textChannel.send("`"+`${message.author.tag} `+ "` " + `⏩` + ` skipped the song`);
    }
    else{
      // let's check this out XD 
      return  queue.textChannel.send("This song already playing");
    }
  }
}