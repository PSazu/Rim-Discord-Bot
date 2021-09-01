const { canModifyQueue } = require('../Utills/utill');

module.exports = {
    name: "loop",
    aliases: ['lq'],
    execute(client, message) {
        const queue = message.client.queue.get(message.guild.id);
        if(!queue) return message.channel.send("There is nothing to loop");
        if (!canModifyQueue(message.member)) return queue.textChannel.send(`You need to join a voice channel first!`);
         // I need continously replay current song on the loop. This loop work only replay and of list.
        queue.loop = !queue.loop;
        const loop = queue.loop ? "**on**" :  "**off**";
        return message.channel.send("`"+`${message.author.tag} `+ "` loop is now " + loop);
    }
}