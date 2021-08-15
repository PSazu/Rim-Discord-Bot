//Local envoirment variable
require('dotenv').config({path: 'E:\\Local workshop files\\VS code workshop\\Rim\\.env'});
// Node modules
const {Client, Message, MessageEmbed} = require('discord.js');
const {FetchUserData, Thumbnail} = require('./Request.js'); 
const moment = require('moment');
//Discord Client object
const client = new Client();

client.on('ready', () => {
    console.log(`${client.user.tag} bot has logged in to the server`);
});

function highestTrained (data) {
  const Languages = Object.keys(data['ranks']['languages']);
  Languages.push(`(${data['ranks']['languages'][Languages[0]]['name']})`);
  const joined = Languages.join(', ');
  return [joined, Languages];
}

client.on('message', Message => {
  if(Message.content.startsWith('\\')) {
    const [Command, ...PREFIX] = Message.content.substring(1).split(' ');
    if(PREFIX[0] === '-user' || PREFIX[0] === '-u') {
      if(PREFIX[0] === undefined || PREFIX[1] === undefined) { return; }
      switch(Command.toLowerCase()) {
        case 'cw':
        case 'codewars': 
        FetchUserData(`https://www.codewars.com/api/v1/users/${PREFIX[1]}`).then(data => {
          console.log('REQUEST SUCCESS');
          const highest = highestTrained(data);
          Message.channel.send(Embeded_Message(data, highest[0],highest[1], Message));
        }).catch(Error => {
          Message.reply('failed to load request :)');
          console.log(Error.message);
        });
        break;
      }
    }
    else if (PREFIX[0] === '-kata' || PREFIX[0] === '-k') {
      if(PREFIX[0] === undefined || PREFIX[1] === undefined) { return; }
      switch(Command.toLowerCase()) {
        case 'cw':
        case 'codewars':
          FetchUserData(`http://www.codewars.com/api/v1/users/${PREFIX[1]}/code-challenges/completed?page=0`).then(JSON => {
            console.log('REQUEST SUCCESS');
            let arr = [];
            for(let i = 0; i < JSON.data.length; i++) {
              if(arr.length === 10) { break;}
              arr.push([JSON['data'][i]['name'],JSON['data'][i]['completedAt']]);
            }
            const description = Formatter(arr);
            const embeded_completed_kata = new MessageEmbed()
            .setAuthor('Codewars', 'https://cdn.discordapp.com/attachments/808327538291900416/872458877126475826/codewars.png')
            .setTitle(`Latest completed katas (${PREFIX[1]})`)
            .setColor('#0099ff')
            .setDescription(description)
            .setFooter(Message.author.tag, Message.author.displayAvatarURL());
            Message.channel.send(embeded_completed_kata)
          })
          .catch(Error => {
            Message.reply('failed to load request :)');
            console.log(Error.message);
          });
          break;
        }
      }
      else if (PREFIX[0] === '-help') {
        console.log('THIS SHIT FINALLY WORKS ??');
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


function Formatter(arr) {
  let str = '';
  let counter = 1; 
  arr.forEach((element, index, array) => {
      let [kata, completedAt] = element;
      let date = moment(completedAt).format('LT');
      str += `${counter}` + ". " + kata + "   " + `(${completedAt.substring(0,10)} ${date})` + "\n \n";
      counter++;
  }) 
  return str
} 



client.login(process.env.RIM_TOKEN)

