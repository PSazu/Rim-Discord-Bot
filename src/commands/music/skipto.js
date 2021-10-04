const {canModifyQueue} = require("../../Utills/utill")

module.exports = {
    name: 'skipto',
    aliases: ['st'],
    execute(client, message, args) {
        if (!args.length || isNaN(args[0])) {
            return message.channel.send("`Usage:` "  + "`~st` " + "`<Queue Number>`")
        }
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send({embed: {
            description: '❌ Nothing playing in this server',
            color: 0xFF5C58
        }});
        if (!canModifyQueue(message.member)) return message.channel.send({
            embed: {
                description: `You need to join a voice channel first!`,
                color: 0xFF5C58
            }
        });
        if (args[0] > queue.songs.length) return message.channel.send(
            {
            embed: {
                description: `The queue is only ${queue.songs.length} songs long!`,
                color: 0xFF5C58
            }}
        )
        queue.playing = true;
        if (queue.loop) {
            for (let i = 0; i < args[0] - 2; i++) {
              queue.songs.push(queue.songs.shift());
            }
          } else {
            queue.songs = queue.songs.slice(args[0] - 2);
          }
        queue.connection.dispatcher.end();
        queue.textChannel.send({
            embed: {
                description: "`" + message.author.username + "` skipped" + "`" + `${args[0] - 1} songs` + "`", 
                color: 0xE1E5EA,
            }
        });
    }
}