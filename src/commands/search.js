require('dotenv').config();
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(process.env.YOUTUBE_API_KEY);

module.exports = {
    name: "search",
    category: 'music-player',
    filter(msg) {
        const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/;
        return pattern.test(msg.content);
    },
    async execute(client, message, args, Discord) {
        if(!args.length) {
            return message.reply("`Usage:` " + "`~play` " + "` <YouTube URL | Video Name>`");
        }
        if(message.channel.activeCollector) return message.reply("A message collector is already active in this channel.");
        if (!message.member.voice.channel) return message.reply("You need to join a voice channel first!");
        let embedMessage = new Discord.MessageEmbed()
        .setTitle("Reply with the song number you want to play")
        .setDescription(`search result for ${args}`)
        .setColor("#F8AA2A");
        try{
            const results = await youtube.searchVideos(args, 10);
            results.map((video, index) => embedMessage.addField(video.shortURL, `${index + 1}. ${video.title}`));
            let resultsMessage = await message.channel.send(embedMessage);
            message.channel.activeCollector = true;
            const response = await message.channel.awaitMessages(this.filter, { max: 1, time: 30000, errors: ["time"] });
            const reply = response.first().content;
            console.log(reply);
            if (reply.includes(",")) {
                let songs = reply.split(",").map((str) => str.trim());
        
                for (let song of songs) {
                  await message.client.commands
                    .get("play")
                    .execute(message, [embedMessage.fields[parseInt(song) - 1].name]);
                }
              } else {
                const choice = embedMessage.fields[parseInt(response.first()) - 1].name;

                message.client.commands.get("play").execute(client, message, [choice]);
              }
              message.channel.activeCollector = false;
              resultsMessage.delete().catch(console.error);
              response.first().delete().catch(console.error);
        }
        catch(error) {
            message.channel.activeCollector = false;
            console.error("Something went wrong in search \n",error);
        }
    }
}