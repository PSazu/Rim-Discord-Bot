//Local envoirment variable
require('dotenv').config({path: 'E:\\Local workshop files\\VS code workshop\\Rim\\.env'});
//modules
const {Client, Message, MessageEmbed} = require('discord.js12');
const {FetchUserData, Thumbnail, Rank} = require('./Request.js'); 
const gif = require('./helper/gifs.js');
//Discord Client object
const client = new Client();

client.on('ready', () => {
    console.log(`${client.user.tag} bot ready to run`);
});

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
          Message.channel.send(Embeded_Message('-user', Message, data));
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
            Message.channel.send(Embeded_Message('-kata', Message, description, PREFIX[1]));
          })
          .catch(Error => {
            Message.reply('failed to load request :)');
            console.log(Error.message);
          });
          break;
        }
      }

	else if (PREFIX[0] === '-rank' || PREFIX[0] === '-r') {
		if(PREFIX[1] === undefined) { return; }
		switch(Command.toLowerCase())
		{
			case 'cw':
			case 'codewars':
				FetchUserData(`https://www.codewars.com/api/v1/users/${PREFIX[1]}`).then(data => {
          Message.channel.send(Embeded_Message('-rank', Message, data));
				})
				.catch(Error => {
					Message.reply('failed to load request :)');
					console.log(Error.message);
				});
			break;
    }
	}
	else if (PREFIX[0] === '-help') {

  } 
}});


function Embeded_Message(Command, Message, data, ...extraArg) {
  const EmbededMessage = new MessageEmbed()
  .setAuthor('Codewars', 'https://cdn.discordapp.com/attachments/808327538291900416/872458877126475826/codewars.png')
  .setFooter(Message.author.tag, Message.author.displayAvatarURL());
  switch(Command.toLowerCase()){
    case'-rank':{
      EmbededMessage.setColor('#FF6B6B');
      EmbededMessage.setTitle(data.username);
      EmbededMessage.setImage(gif.generateGifs(1, 11));
      EmbededMessage.setDescription(`Hi ${data.username}, ${Rank(data.honor)}`);
      return EmbededMessage;
    }
    case '-user': {
      const user_data = highestTrained(data);
      EmbededMessage.setTitle(data.username);
      EmbededMessage.setColor(0x23272A);
      EmbededMessage.setThumbnail(Thumbnail(user_data[1]));
      EmbededMessage.addFields({name: 'Progress', value: `Rank: ${data['ranks']['overall'].name} 
      Leaderboard Position: #${data.leaderboardPosition} \n Honor: ${data.honor} 
      Total Completed Kata: ${data.codeChallenges['totalCompleted']} \n Highest Trained: ${user_data[0]}`, inline: true});
      return EmbededMessage;
    }
    case '-kata':{
      EmbededMessage.setTitle(`Latest completed katas (${extraArg})`);
      EmbededMessage.setColor('#0099ff');
      EmbededMessage.setDescription(data);
      return EmbededMessage;
    }
  }
}

function Formatter(arr) {
  let str = '';
  let counter = 1; 
  arr.forEach((element) => {
      let [kata, completedAt] = element;
      str += `${counter}` + ". " + kata + "   " + `(${completedAt.substring(0,10)})` + "\n \n";
      counter++;
  }) 
  return str
} 

function highestTrained (data) {
  const Languages = Object.keys(data['ranks']['languages']);
  Languages.push(`(${data['ranks']['languages'][Languages[0]]['name']})`);
  const joined = Languages.join(', ');
  return [joined, Languages];
}

client.login(process.env.RIM_TOKEN)

