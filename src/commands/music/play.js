require('dotenv').config();
const YouTubeAPI = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const { play } = require('../../includes/play.js')
const youtube = new YouTubeAPI(process.env.YOUTUBE_API_KEY);


module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'music-player',
    async playlist(message, channel, args) {
        const serverQueue = message.client.queue.get(message.guild.id);
        const { MessageEmbed } = require('discord.js12');
        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true
          };

        let playlist = null;
        let videos = [];
        try{
            playlist = await youtube.getPlaylist(args, { part: "snippet" });
            videos = await playlist.getVideos(70, { part: "snippet" });

        }
        catch(error) {
            console.log(error.message);
            return message.reply("❌ " + "`Playlist not found`");
        }

        const newSongs = videos 
        .filter((video) => video.title != "Private video" && video.title != "Deleted video")
        .map((video) => {
            return (song = {
              title: video.title,
              url: video.url,
              duration: video.durationSeconds
            });
          });;
       

        serverQueue ? serverQueue.songs.push(...newSongs) : queueConstruct.songs.push(...newSongs);

        let playlistEmbed = new MessageEmbed()
        .setTitle(`${playlist.title}`)
        .setDescription(newSongs.map((song, index) => "`" + `${index + 1}.`+"`" + ` ${song.title} \n`))
        .setURL(playlist.url)
        .setColor("#D7DDE8")
        .setTimestamp()
        .setFooter( message.author.tag,  message.author.displayAvatarURL());

        if (playlistEmbed.description.length >= 2048) playlistEmbed.description = playlistEmbed.description.substr(0, 2007) + "\nPlaylist larger than character limit...";
        
        message.channel.send("`" + `${message.author.username}`+ "`" + ` started a playlist`, playlistEmbed);

        if (!serverQueue) {
            message.client.queue.set(message.guild.id, queueConstruct);
      
            try {
              queueConstruct.connection = await channel.join();
              await queueConstruct.connection.voice.setSelfDeaf(true);
              play(queueConstruct.songs[0], message);
            } catch (error) {
              console.error(error);
              message.client.queue.delete(message.guild.id);
              await channel.leave();
              return message.channel.send({embed: {
                  description: `Could not join the channel: ${error}`,
                  color: 0xFF5C58
              }});
            }
          }
    },
    async execute(client, message, args, Discord) {
        const { channel } = message.member.voice;
        const ServerQueue = message.client.queue.get(message.guild.id);
        // URL VALIDATE REGEX
        const youtubeURL =  /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        const validPlaylist = /^.*(list=)([^#\&\?]*).*/gi;
        const youtubeRadio = /(start_radio)/gi
        const url = typeof args === 'object' ? args.join(' ').trim() : args; 
        const urlValid = youtubeURL.test(url);
        // CHECK USER JOINED VOICE CHAT
        if (!channel) return message.reply({embed: { description: `You need to join a voice channel first!`, color: 0xFF5C58}}).catch(console.error);
        if(ServerQueue && channel !== message.guild.me.voice.channel) { return message.reply(`You must be in the same channel as ${message.client.user}`)}
        // NO ARGUMENT
        if(url.length === 0 || url === " ") return message.reply("`Usage:` " + "`~play` " + "` <YouTube URL | Video Name>`");
        // REQUEST PREMISSION
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return message.channel.send({embed: {description: 'Cannot connect to voice channel, missing permissions', color: 0xFF5C58}});
        if (!permissions.has("SPEAK")) return message.channel.send({embed: { description: 'I cannot speak in this voice channel, make sure I have the proper permissions!', color: 0xFF5C58}});
        if(!youtubeURL.test(args) && validPlaylist.test(args)) {
            if(youtubeRadio.test(args)){
               return message.channel.send('❌ Rim bot doesn\'t support youtube radio'); 
            }
            return this.playlist(message, channel, url)
        } 
        
        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true,
            message_count: 0,
        };
        let songInfo = null;
        let song = null;
        if(urlValid) {
           try{
               songInfo = await ytdl.getInfo(url);
               song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                duration: songInfo.videoDetails.lengthSeconds
             };
            
           }
           catch(error){
            console.error("Failed to get url info", error);
            return message.channel.send(error.message);
           }
        }
        else {
            try{
            const results = await youtube.searchVideos(url, 1, { part: "snippet" });
            if (results.length <= 0) {
                // No video results.
                message.channel.send({embed: {description: 'I didn’t find any matching songs ＞﹏＜'}});
                return;
            }
            songInfo = await ytdl.getInfo(results[0].url);
            song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                duration: songInfo.videoDetails.lengthSeconds,
            }
        }
        catch(error) {
            console.error("Something went wrong in commands-play \n", error);
        }
    }

        if(ServerQueue) {
            ServerQueue.songs.push(song);
            return message.channel.send({embed: {
                description: `Queued [${song.title}](${song.url}) ` + `[${message.author}]`,
                color: 0xE1E5EA
            }});
        }

        queueConstruct.songs.push(song);
        message.client.queue.set(message.guild.id, queueConstruct);

        try {
            queueConstruct.connection = await channel.join();
            await queueConstruct.connection.voice.setSelfDeaf(true);
            play(queueConstruct.songs[0], message);
          } catch (error) {
            message.client.queue.delete(message.guild.id);
            await channel.leave();
            return message.channel.send(error.message);
        }

    }   
} 