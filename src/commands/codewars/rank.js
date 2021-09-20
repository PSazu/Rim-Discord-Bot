const {fetchData, rank} = require('../../api/request');
const {generateGifs} = require('../../helper/gif');
module.exports = {
    name: '-rank',
    aliases: ['-r'],
    category: 'codewars',
    execute(client, message, args) {
        fetchData(`https://www.codewars.com/api/v1/users/${args}`).then(JSON =>{
            message.channel.send({embed:{
                author: {name: 'Codewars',icon_url: 'https://cdn.discordapp.com/attachments/808327538291900416/872458877126475826/codewars.png'},
                title: JSON.username,
                color: 0xFF6B6B,
                image: {
                   url: generateGifs(1, 19),
                },
                description: `Hi ${JSON.username}, ${rank(JSON.honor)}`,
                footer: {
                    text: message.author.tag, 
                    icon_url:  message.author.displayAvatarURL()
                }
            }});
        })
        .catch(Error => {
            message.reply('failed to load request :)');
            console.log(Error.message);
          });
    }
}