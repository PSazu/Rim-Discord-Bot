const {generateGifs} = require('../../helper/gif.js');

module.exports = {
    name: 'info',
    aliases: ['botinfo'],
    execute(client, message) {
     
        message.channel.send({
            embed: {
                author: {name: 'Rim bot info',icon_url: client.user.avatarURL()},
                description: 'Ирээдүйд ганц хөгжим тоглуулдаг биш олон төрлийн зорилгоор ашигладаг болгох ба мөн Гадаад болон ' + 
                'дотоодын discord server дээр ашигладаг болгох нь Rim bot - ны зорилго байгаа шүү' ,
                fields: [{
                    name: 'Өөрчлөлт',
                    value: "`1.` Эхний ээлжид зарим нэг bug, өөрийн серверт prefix гэх мэтчилэн тохируулан ашигладаг болгох" + 
                    '\n \n' + "`2.` Music message send - ийг сайжруулах" + '\n \n' + " `3.`Өгөгдлийн сан нэмэх ба хэрэглэгч нь өөрийн гэсэн дууны playlist, одоо тоглож байгаа queue-г хадгалж авдаг болгох. Ингэснээр дараа дахиж хүссэн цагтаа сонсдог болгох"
                    + '\n \n' +  '`4.` Twitch notify - Дуртай streamer - ийнхаа live - ийг мэдэлгүй өнгөрөөвөл тэнэг биз дэ ¯\_(ツ)_/¯.' + '\n \n' +
                    "`5.` Олон улсын хэл дэмждэг болгох жишээ нь Монгол, Англи, Япон хэлнээс эхлээд явах байх. Мэдээж default хэл нь `Англи хэл`"
                 }],
                 image: {
                     url: generateGifs(1, 17),
                 },
                 timestamp: new Date(),
            }
        });
    }
}