const { canModifyQueue } = require('../../Utills/utill');

module.exports = {
    name: "loop",
    aliases: ['lq'],
    execute(client, message) {
        const queue = message.client.queue.get(message.guild.id);
        if(!queue) return message.channel.send({embed: { description: "There is nothing to loop", color: 0xFF5C58}});
        if (!canModifyQueue(message.member)) return queue.textChannel.send({embed: {description: `You need to join a voice channel first!`, color: 0xFF5C58}});
         // I need continously replay current song on the loop. This loop work only replay and of list.
        queue.loop = !queue.loop;
        const loop = queue.loop ? "**on**" :  "**off**";
        return message.channel.send({
            embed: {
                description: "`"+`${message.author.username} `+ "` loop is now " + loop,
                color: 0xE1E5EA
            }
        });
    }
}