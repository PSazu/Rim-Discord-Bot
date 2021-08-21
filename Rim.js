//Local envoirment variable
require('dotenv').config();
//modules
const Discord = require('discord.js12');

//Discord Client object
const client = new Discord.Client({ disableMentions: 'everyone' });
client.commands = new Discord.Collection();
client.events  = new Discord.Collection();

['command_handler', 'event_handler'].forEach(events => {
    require(`./src/handler/${events}`)(client, Discord)
})

client.login(process.env.RIM_TOKEN)

