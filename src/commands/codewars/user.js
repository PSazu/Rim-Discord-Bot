const {fetchData, thumbnail} = require('../../api/request');
module.exports = {
    name: 'user',
    aliases: ['u'],
    category: 'codewars',
    
    highestTrained (data) {
        const Languages = Object.keys(data['ranks']['languages']);
        Languages.push(`(${data['ranks']['languages'][Languages[0]]['name']})`);
        const joined = Languages.join(', ');
        return [joined, Languages];
    },

    execute (client, message, args) {
        if(!args.length) { return message.channel.send("`~user` `< Codewars username >`");}
        fetchData(`https://www.codewars.com/api/v1/users/${args}`).then(JSON => {
            const user_data = this.highestTrained(JSON);
            message.channel.send({
                embed:{
                    author: {name: 'Codewars',icon_url: 'https://cdn.discordapp.com/attachments/808327538291900416/872458877126475826/codewars.png'},
                    title: JSON.username,
                    color: 0x23272A,
                    thumbnail:{
                        url: thumbnail(user_data[1]),
                    },
                    fields: [{
                        name: 'Progress',
                        value: `Rank: ${JSON['ranks']['overall']['name']} 
                        Leaderboard Position: #${JSON['leaderboardPosition']} \n Honor: ${JSON['honor']}
                        Total Completed Kata: ${JSON['codeChallenges']['totalCompleted']} 
                        Highest Trained: ${user_data[0]}`,
                        inline: true,
                    },
                ],
                footer: {
                    text: message.author.tag, 
                    icon_url:  message.author.displayAvatarURL()
                }
                }
            });
        })
        .catch(Error => {
            message.reply('failed to load request :)');
            console.log(Error.message);
          });
    }
}