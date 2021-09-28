const { filledBar } = require("string-progressbar");

module.exports = {
    name: 'np',
    aliases: ['nowplaying'],
    execute(client, message, args, Discord) {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send("❌ **Nothing playing in this server**");
        try{
        const song = queue.songs[0];
        const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
        const left = song.duration - seek;

        let nowPlaying = new Discord.MessageEmbed()
        .setColor("#F3F1F5")
        .setAuthor('Now playing', message.client.user.avatarURL());
        
        if(song.duration > 0) {
            nowPlaying.setDescription(`[${song.title}](${song.url})` + "\n" + 
            new Date(seek * 1000).toISOString().substr(11, 8) +
                    "[" +
                    filledBar(song.duration == 0 ? seek : song.duration, seek, 20)[0] +
                    "]" +
                    (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)),
                  false);
                  nowPlaying.setFooter(`Time Remaining: ${new Date(left * 1000).toISOString().substr(11, 8) }`);
        }
        return message.channel.send(nowPlaying);
        } 
        catch(error) {
            console.log('Something went wrong in nowplaying');
            console.error(error);
            message.channel.send('❌ Something went wrong in nowplaying command');
        }
    }
}