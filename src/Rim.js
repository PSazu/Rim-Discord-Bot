//Local envoirment variable
require('dotenv').config({path: 'E:\\Local workshop files\\VS code workshop\\Rim\\.env'});
// Node modules
const {Client, Message, MessageEmbed} = require('discord.js');
const {FetchUserData, Thumbnail} = require('./Request.js');

//Discord Client object
const client = new Client();

client.on('ready', () => {
    console.log(`${client.user.tag} bot has logged in to the server`);
});

client.on('message', Message => {
  if(Message.content.startsWith('\\')) {
    const [Command, ...user] = Message.content.substring(1).split(' ');
    if(user.length === 0 || user === 'undefined') { return; } 
    switch(Command.toLowerCase()) {
      case 'codewars': {
        FetchUserData(user[0]).then(data => {
          console.log('REQUEST SUCCESS');
          const language = Object.keys(data['ranks']['languages']);
          language.push(`(${data['ranks']['languages'][language[0]]['name']})`);
          const trained_Language = language.join(', ');
          Message.channel.send(Embeded_Message(data, trained_Language, language, Message));
        }).catch(Error => {
          Message.reply('failed to load request :)');
          console.log(Error.message);
        });
        break;
      }
    }
  } 
})


function Embeded_Message(data, trained, thumb, Message) {
  const embed = new MessageEmbed()
  .setAuthor('Codewars', 'https://cdn.discordapp.com/attachments/808327538291900416/872458877126475826/codewars.png')
  .setTitle(data.username) 
  .setColor(0x23272A)
  .setThumbnail(Thumbnail(thumb))
  .addFields({name: 'Progress', value: `Rank: ${data['ranks']['overall'].name} \n Leaderboard Position: #${data.leaderboardPosition} \n Honor: ${data.honor} \n Total Completed Kata: ${data.codeChallenges['totalCompleted']} \n Highest Trained: ${trained}`, inline: true})
  .setFooter(Message.author.tag, Message.author.displayAvatarURL());
  return embed;
}


client.login(process.env.RIM_TOKEN)

