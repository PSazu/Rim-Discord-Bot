const {generateGifs} = require('../../helper/gif.js');
module.exports = {
    name: 'time',
    aliases: ['uptime'],
    execute(client, message) {
        let seconds = Math.floor(message.client.uptime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
    
        seconds %= 60;
        minutes %= 60;
        hours %= 24;
        
      
        return message.channel.send(
            {
                embed: {
                    author: {name: 'Rim\'s total alive time ',icon_url: client.user.avatarURL()},
                    description: "`" + `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds` + "`",
                    image: generateGifs(1, 17),
                    color: 0xFF6B6B, 
                }
            }
        )
    }
}