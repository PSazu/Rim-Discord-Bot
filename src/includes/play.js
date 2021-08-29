const ytdl = require("ytdl-core-discord");
const { canModifyQueue } = require('../Utills/utill.js');
const PRUNING = false; 

// 1) it doesn't need sending emojies on player XD.
// 2) I just need to handle on commands.
module.exports = {
    async play(song, message) {
        const queue = message.client.queue.get(message.guild.id);
        if(!song) {
            message.channel.send('❌ Music queue ended.');
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
        if (collector && !collector.ended) collector.stop();

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
      try {
        var playingMessage = await queue.textChannel.send(`🎶 Started playing: **${song.title}** \n ${song.url}`);
        playingMessage.react("⏭")
           .then(() => playingMessage.react("⏯"))
           .then(() => playingMessage.react("🔇"))
           .then(() => playingMessage.react("🔁"))
           .then(() => playingMessage.react("⏹"))
           .catch((error) => console.error(error));
    
      }
      catch (error) {
          console.error(error);
      }
      const filter = (reaction, user) => user.id !== message.client.user.id;
      var collector = playingMessage.createReactionCollector(filter, {time: song.duration > 0 ? song.duration * 1000 : 600000});

      collector.on("collect", (reaction, user) => {
        if (!queue) return;
        const member = message.guild.member(user);
        switch (reaction.emoji.name) {
            case "⏭": {
                queue.playing = true;
                reaction.users.remove(user);
                if (!canModifyQueue(member)) return message.reply('You need to join a voice channel first!');
                queue.connection.dispatcher.end();
                queue.textChannel.send("`"+`${user.username} `+ "` " + `⏩` + ` skipped the song`)
                collector.stop();
                break;
            }
            case "⏯": {
                reaction.users.remove(user);
                if (!canModifyQueue(member)) return message.reply('You need to join a voice channel first!');
                if (queue.playing) {
                  queue.playing = !queue.playing;
                  queue.connection.dispatcher.pause(true); 
                  queue.textChannel.send("`"+`${user.username} `+ "` " + `⏸` + ` paused the music.`);
                } 
                else {
                  queue.playing = !queue.playing;
                  queue.connection.dispatcher.resume();
                  queue.textChannel.send("`"+`${user.username} `+ "` " + `▶` + ` resumed the music!`);
                }
              break;
            }

            case "🔇": {
              reaction.users.remove(user).catch(console.error);
              if (!canModifyQueue(member))  return message.reply('You need to join a voice channel first!');
              if (queue.volume <= 0) {
                queue.volume = 100;
                queue.connection.dispatcher.setVolumeLogarithmic(100 / 100);
                queue.textChannel.send("`"+`${user.username} `+ "` " + `🔊` + ` unmuted the music!`);
              } 
              else {
                queue.volume = 0;
                queue.connection.dispatcher.setVolumeLogarithmic(0);
                queue.textChannel.send("`"+`${user.username} `+ "` " + `🔇` + ` muted the music!`);
              }
              break;
            }
            case "🔁":{
              reaction.users.remove(user).catch(console.error);
              if (!canModifyQueue(member)) return message.reply('You need to join a voice channel first!');
              queue.loop = !queue.loop;
              console.log("loop status" + queue.loop);
              const loop = queue.loop ? "**on**" :  "**off**";
              queue.textChannel.send("`"+`${user.username} `+ "` Loop is now " + loop);
              break;
            }
            case "⏹": {
              reaction.users.remove(user).catch(console.error);
              if (!canModifyQueue(member)) return message.reply('You need to join a voice channel first!');
              queue.songs = [];
              queue.textChannel.send("`"+`${user.username} `+ "` " + `⏹` + ` stopped the music!`);
              try {
                queue.connection.dispatcher.end();
              } catch (error) {
                console.error(error);
                queue.connection.disconnect();
              }
              collector.stop();
              break;
            }
        }
      });

      collector.on("end", () => {
        playingMessage.reactions.removeAll().catch(console.error);
        if (PRUNING && playingMessage && !playingMessage.deleted) {
          playingMessage.delete({ timeout: 3000 }).catch(console.error);
        }
      });
    }
} 