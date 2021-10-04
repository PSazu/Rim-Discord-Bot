const fs = require('fs');
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
                    value: 'Дууг давтан тоглуулах болно.',
                    inline: true
                }, 
                {
                    name: 'skipto `(st)`',
                    value: 'Queue доторх дурын дуу луу алгасаж тоглуулна',
                    inline: true
                },  
                {
                    name: 'uptime `(time)`',
                    value: 'Rim-ийн нийт амьдарсан цаг',
                    inline: true
                },
                {
                    name: 'disconnect `(dc)`',
                    value: 'Voice channel - аас гарах',
                    inline: true
                },
                {
                    name: 'pause',
                    value: 'Одоо тоглож байгаа дууг зогсоох',
                    inline: true
                },
                {
                    name: 'resume',
                    value: 'Pause хийгдсэн дууг үргэлжлүүлэх',
                    inline: true
                },
                {
                    name: 'botinfo `(info)`',
                    value: 'Rim ботны дэлгэрэнгүй мэдээлэл харуулах ба future update',
                    inline: true
                },
                {
                    name: 'prefix',
                    value: 'Комманд prefix',
                    inline: true
                },
                {
                    name: 'invite',
                    value: 'Rim bot invite хийх',
                    inline: true
                },
                {
                    name: '\u200B',
                    value: 'Ботны талаар холбоо барих, санал хүсэлт, Bug олдвол `Discord: Rin音#1404`,  Contribution хийх бол [github](https://github.com/just-tugsuu/Rim-Discord-Bot),  [facebook](https://www.facebook.com/profile.php?id=100006634698123)  нэмэлт мэдээллийг `botinfo`'

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