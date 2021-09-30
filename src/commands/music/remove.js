const { canModifyQueue } = require('../../Utills/utill');

module.exports = {
    name: 'remove',
    aliases: ['rm'],
    execute(client, message, args) {
        const queue = message.client.queue.get(message.guild.id);
        const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/;
        if (!queue) return message.channel.send("❌ **Nothing playing in this server**");
        if (!canModifyQueue(message.member)) return queue.textChannel.send(`You need to join a voice channel first!`);
        if(!args.length) return message.channel.send("`Usage:" + " ~rm`" + "`<Queue Number>`");
        
        const arguments = args.join("");
        const songs = arguments.split(",").map((arg) => parseInt(arg));
        let removed = [];

        if (pattern.test(arguments)) {
            queue.songs = queue.songs.filter((item, index) => {
              if (songs.find((songIndex) => songIndex - 1 === index)) removed.push(item);
              else return true;
            });
           
            if(removed.length && removed.length >= 2) {
                let removed_songs = removed.map((song, index) => {
                    return "`" + `${index + 1}.` + "` "+ song.title}).join("\n\n");
               
                return queue.textChannel.send({
                    embed: {
                        title: 'Songs that removed from queue',
                        color: 0xE1E5EA,
                        description:`${removed_songs}`,
                        footer: {
                            text: message.author.tag,
                            icon_url:  message.author.displayAvatarURL(),
                        }
                    }
                });
            }
            else if(removed.length) {
                let removed_songs = removed.map((song) => song.title).join("\n");
                return queue.textChannel.send(`❌ **${removed_songs}** is removed from the queue`);   
            }
            return queue.textChannel.send("Song is not found in Queue");
        } else {
            console.log("Else statement triggered in Remove");
        }

    }
}