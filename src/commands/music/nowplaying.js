const { filledBar } = require("string-progressbar");
const ytdl = require('ytdl-core');

async function getInfo(url) {
    let songInfos = await ytdl.getInfo(url);
    return song = {
        title: songInfos.videoDetails.title,
        url: songInfos.videoDetails.video_url,
        duration: songInfos.videoDetails.lengthSeconds
    }
}

function embedMessageDesc(embed, song, seek, message, duration) {
    embed.setDescription(`[${song.title}](${song.url})` + "\n" + 
    new Date(seek * 1000).toISOString().substr(11, 8) +
            "[" +
            filledBar(song.duration == 0 ? seek : song.duration, seek, 20)[0] +
            "]" +
            (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)),
          false);
    embed.setFooter(`Time Remaining: ${new Date(duration * 1000).toISOString().substr(11, 8) }`);
    return message.channel.send(embed);
}


module.exports = {
    name: 'np',
    aliases: ['nowplaying'],
    execute(client, message, args, Discord) {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send({embed: {description: "❌ Nothing playing in this server", color: 0xFF5C58}});
        try{
        const song = queue.songs[0];
        const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
        const left = song.duration - seek;
        if(!seek) { return ; }
        let nowPlaying = new Discord.MessageEmbed()
        .setColor("#F3F1F5")
        .setAuthor('Now playing', message.client.user.avatarURL());
        
        if(song.duration > 0) {
            embedMessageDesc(nowPlaying, song, seek, message, left); 
        }
        else{
            let playlistInfo = getInfo(song.url);
            getInfo(song.url).then(psudoSong => {
               embedMessageDesc(nowPlaying, psudoSong, seek, message, psudoSong.duration - seek);
            })
        }
        } 
        catch(error) {
            console.log('Something went wrong in nowplaying');
            console.error(error);
            message.channel.send({
                embed: {
                    description: '❌ Something went wrong in nowplaying command',
                    color: 0xFF5C58
                }
            });
        }
    }
}


