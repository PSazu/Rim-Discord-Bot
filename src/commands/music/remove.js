const { canModifyQueue } = require('../../Utills/utill');

module.exports = {
    name: 'remove',
    aliases: ['rm'],
    execute(client, message, args) {
        const queue = message.client.queue.get(message.guild.id);
        const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/;
        if (!queue) return message.channel.send("❌ **Nothing playing in this server**");
        if (!canModifyQueue(message.member)) return queue.textChannel.send(`You need to join a voice channel first!`);
        if(!args.length) return message.channel.send("`Usage:`" + "`~remove || rm` " + "` <Queue Number>`");
        
        const arguments = args.join("");
        const songs = arguments.split(",").map((arg) => parseInt(arg));
        let removed = [];

        if (pattern.test(arguments)) {
            queue.songs = queue.songs.filter((item, index) => {
              if (songs.find((songIndex) => songIndex - 1 === index)) removed.push(item);
              else return true;
            });
            queue.textChannel.send(`${message.author.tag} ❌ removed **${removed.map((song) => song.title).join("\n")}** from the queue`);
        } else {
            console.log("Else statement triggered in Remove");
        }

    }
}