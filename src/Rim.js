require('dotenv').config({path: 'E:\\Local workshop files\\VS code workshop\\Rim\\.env'});

const {Client, Message} = require('discord.js');
const client = new Client();

client.on('ready', () => {
    console.log(`${client.user.tag} bot has logged in to the server`);
});

client.on('message', (Message) => {
    // if(Message.content === "_list") {
    //     Message.reply('Current task list');
    // }
    switch(Message.content) {
        case '_list': Message.reply('Одоо байгаа ажилын жагсаалт 💻'); break;
        case '_add': Message.reply('Жагсаалтанд нэмэх ✔️'); break;
        case '_del': Message.reply('Жагсаалтнаас устгах ❌'); break;
    }
});


client.login(process.env.RIM_TOKEN)

