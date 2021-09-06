require('dotenv').config();
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(process.env.YOUTUBE_API_KEY);
const { play } = require('../includes/play.js')

module.exports = {
    name: "search",
    category: 'music-player',
    filter(msg) {
        const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/;
        return pattern.test(msg.content);
    },
    async execute(client, message, args, Discord) {
        if(!args.length) {
            return message.reply("`Usage:` " + "`~search` " + "` <music number>`");
        }
       
        if(message.channel.activeCollector) return message.reply("A message collector is already active in this channel.");
        if (!message.member.voice.channel) return message.reply("You need to join a voice channel first!");
        let embedMessage = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setTitle(`search result for ${args.join(' ')}`)
        .setColor("#F8AA2A")
        .setTimestamp();
      
        try{
            const results = await youtube.searchVideos(args, 10);
            let music_list = [], resultsMessage = null;
            let info = results.map((video, index) => {
                music_list.push(video.url);
                let description = "`" + `${++index}.`+"` "+ `[${video.title}](${video.url})`;
                return description; 
            }).join('\n\n');
            embedMessage.setDescription(info); 
            if(!music_list.length) {  resultsMessage = await message.channel.send("❌ search didn't find anything "); }
            else {
                resultsMessage = await message.channel.send(embedMessage);
            }
            message.channel.activeCollector = true;
            const response = await message.channel.awaitMessages(this.filter, { max: 1, time: 30000, errors: ["time"] });
            const reply = response.first().content;
            if (reply.includes(",")) {
                let songs = reply.split(",").map((str) => str.trim());
                for (let song of songs) {
                   await message.client.commands.get("play").execute(client, message, music_list[parseInt(song) - 1]);
                }
              } else {
                const choice = music_list[parseInt(response.first()) - 1];
                message.client.commands.get("play").execute(client, message, [choice]);
              }
              
              message.channel.activeCollector = false;
              resultsMessage.delete().catch(console.error);
              response.first().delete().catch(console.error);
        }
        catch(error) {
            message.channel.activeCollector = false
            console.error("Something went wrong in search \n",error);
        }
    }
}