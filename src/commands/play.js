require('dotenv').config();
const YouTubeAPI = require('simple-youtube-api');
const { validateURL } = require('ytdl-core');
const ytdl = require('ytdl-core');
const { play } = require('../includes/play.js')
const youtube = new YouTubeAPI(process.env.YOUTUBE_API_KEY);




module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'music-player',
    async execute(client, message, args, Discord) {
        const { channel } = message.member.voice;
        const ServerQueue = message.client.queue.get(message.guild.id);
        // URL VALIDATE REGEX
        const youtubeURL =  /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        const validPlaylist = /^.*(list=)([^#\&\?]*).*/gi;
        const url = args.join('').trim();
        const urlValid = youtubeURL.test(url);
        // CHECK USER JOINED VOICE CHAT
        if (!channel) return message.reply('You need to join a voice channel first!').catch(console.error);
        if(ServerQueue && channel !== message.guild.me.voice.channel) { return message.reply(`You must be in the same channel as ${message.client.user}`)}
        // NO ARGUMENT
        if(url.length === 0 || url === " ") return message.reply("`Usage:` " + "`~play` " + "` <YouTube URL | Video Name>`");
        // REQUEST PREMISSION
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return message.channel.send('Cannot connect to voice channel, missing permissions');
        if (!permissions.has("SPEAK")) return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
        // CHECK IF IT'S PLAYLIST ?? 
        if(!youtubeURL.test(args) && validPlaylist.test(args)) { message.channel.send("This url is playlist"); return; } 
        
        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true
        };
        let songInfo = null;
        let song = null;
        // how to handle these try catch blocks
        if(urlValid) {
           try{
               songInfo = await ytdl.getInfo(url);
               song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                duration: songInfo.videoDetails.lengthSeconds
             };
             console.log(song);
           }
           catch(error){
            console.error("Failed to get url info", error);
            return message.channel.send(error.message);
           }
        }
        else {
            const results = await youtube.searchVideos(url, 1, { part: "snippet" });
            if (results.length <= 0) {
                // No video results.
                message.channel.send("`Audio Not Found`");
                return;
            }
            songInfo = await ytdl.getInfo(results[0].url);
            song = {
              title: songInfo.videoDetails.title,
              url: songInfo.videoDetails.video_url,
              duration: songInfo.videoDetails.lengthSeconds
            }  
        }

        if(ServerQueue) {
            console.log("song is pushed to the serverQueue's songs arr");
            serverQueue.songs.push(song);
            return message.channel.send(`✅ **${song.title}** has been added to the queue by **${message.auther}**`)
        }

        queueConstruct.songs.push(song);
        message.client.queue.set(message.guild.id, queueConstruct);

        try {
            queueConstruct.connection = await channel.join();
            await queueConstruct.connection.voice.setSelfDeaf(true);
            play(queueConstruct.songs[0], message);
            console.log('PLAYS MUSIC I GUESS');
          } catch (error) {
            console.error(error);
            message.client.queue.delete(message.guild.id);
            await channel.leave();
            return message.channel.send('Could not join the channel');
        }

    }   
} 