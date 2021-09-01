const ytdl = require("ytdl-core-discord");

module.exports = {
    async play(song, message) {
        const queue = message.client.queue.get(message.guild.id);
        if(!song) {
            setTimeout(function () {
              // this works when nothing to play
              if (queue.connection.dispatcher && message.guild.me.voice.channel) return;
              queue.channel.leave();
              message.channel.send('❌ Music queue ended.');
            }, 500 * 1000);
            return message.client.queue.delete(message.guild.id);
        }
        let stream = null;
        let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";
        try{
            if(song.url.includes("youtube.com")) {
                stream = await ytdl(song.url, {highWaterMark: 1 << 25});
            }
        }
        catch(error) {
            if(queue) {
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            }
            console.error("Queue error", error);
            return message.channel.send(`❌ Error occured in queue`);
        }

      const dispatcher = queue.connection
      .play(stream, { type: streamType })
      .on("finish", () => {
      
        if (queue.loop) {
          // if loop is on, push the song back at the end of the queue
          // so it can repeat endlessly
          let lastSong = queue.songs.shift();
          queue.songs.push(lastSong);
          module.exports.play(queue.songs[0], message);
        } else {
          // Recursively play the next song
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", (err) => {
        console.error(err);
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      });
      dispatcher.setVolumeLogarithmic(queue.volume / 100);
      await queue.textChannel.send(`🎶 Started playing: ` + "`"+`${song.title}` + "`");
    }
} 