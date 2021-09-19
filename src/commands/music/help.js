const fs = require('fs');
const {generateGifs} = require('../../helper/gif.js');
module.exports = {
    name: "help",
    category: "music-player",
    execute(client, message) {
        const ignore = {
            'user': true,
            'kata': true,
            'rank': true,
            'botinfo': true,
            'prefix': true,
            'invite': true
          }
        let description = "";
        let command_files = getCommandFiles();
        for(let i = 0; i < command_files.length; i++) {
            const file_name = command_files[i].match(/\w+/)[0];
            if(!ignore[file_name]) {
                description += "`"+ file_name + "`, "  
            } 
        }
        message.channel.send({
            embed:{
                author: {name: 'Rim help pannel',icon_url: client.user.avatarURL()},
                fields: [{
                    name: 'Music',
                    value: description.slice(0, description.length - 2),
                },
                {
                    name: 'Bot',
                    value: '`prefix`, `help`, `invite`, `botinfo`'
                },
                {
                    name: 'Codewars',
                    value: '`user`, `kata`, `rank`'
                },
                {
                    name:  "\u200B",
                    value: 'if you need more information about bot then check out our ' + `[github repository](https://github.com/just-tugsuu/Rim-Discord-Bot)` 
                }
            
            ],
                color: 0xB2B1B9,
            }
        });

        message.channel.send({
            embed: {
                author: {name: 'Rim',icon_url: client.user.avatarURL()},
                description: 'Some description here',
                fields: [{
                    name: "play `(p)`",
                    value: "Дуу тоглуулах бөгөөд одоохондоо зөвхөн youtube дэмжиж байгаа.",
                    inline: true
                },
                {
                    name: 'search `(s)`',
                    value: 'search хийх ба хүссэн дуугаа reply хийж сонсох боломжтой. Олон дуу сонгохоор болвол таслал авч сонгоно',
                    inline: true
                }, 
                {
                    name: 'queue `(q)`',
                    value: 'Server дэээр тоглож байгаа дууны жагсаалт харуулна',
                    inline: true
                },
                {
                    name: 'nowplaying `(np)`',
                    value: 'Одоо тоглож байгаа дууг харах',
                    inline: true
                }, 
                {
                    name: 'remove `(rm)`',
                    value: 'Queue буюу жагсаалтаас дуу гаргана',
                    inline: true
                }, 
                {
                    name: 'shuffle',
                    value: 'Жагсаалтанд байгаа дууны байршлыг солино',
                    inline: true
                }, 
                {
                    name: 'loop',
                    value: 'Энийг болвол засна.',
                    inline: true
                }, 
                {
                    name: 'move',
                    value: 'Энэ коммандын кодыг бичиж дуусгаагүй байгаа',
                    inline: true
                },  
                {
                    name: 'uptime `(time)`',
                    value: 'Rim-ийн нийт амьдарсан цаг',
                    inline: true
                }],
                color: 0xB2B1B9
            }
        });
       
    }
}

function getCommandFiles() {
    const codewars_commands = fs.readdirSync('./src/commands/codewars/')
    const music_commands = fs.readdirSync('./src/commands/music/')
    return music_commands.concat(codewars_commands);
}