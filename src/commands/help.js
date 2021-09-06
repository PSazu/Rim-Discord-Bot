const fs = require('fs');
const {generateGifs} = require('../helper/gif.js');
module.exports = {
    name: "help",
    category: "music-player",
    execute(client, message) {
        const codewars = {
            'user': true,
            'kata': true,
            'rank': true
          }
        let description = "";
        const command_files = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
        for(let i = 0; i < command_files.length; i++) {
            const file_name = command_files[i].match(/\w+/)[0];
            if(!codewars[file_name]) {
                description += "`"+ file_name + "`, "  
            } 
        }
        message.channel.send({
            embed:{
                title: "Rim help pannel",
                fields: [{
                    name: 'Music',
                    value: description.slice(0, description.length - 2),
                },
                {
                    name: 'Codewars',
                    value: '`user`, `kata`, `rank`'
                }],
                image: {
                    url: generateGifs(1, 18),
                 },
                color: 0xB2B1B9,
                footer: {
                    text: message.author.tag, 
                    icon_url:  message.author.displayAvatarURL()
                }
            }
        });
    }
}