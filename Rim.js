//Local envoirment variable
require('dotenv').config();
//modules
const Discord = require('discord.js12');
const fs = require('fs');
const chalk = require('chalk');
//Discord Client object
const client = new Discord.Client({ disableMentions: 'everyone' });
client.commands = new Discord.Collection();
client.queue = new Map();

try{
    const terminal_sign = fs.readFileSync('./terminal.txt', 'utf8');
    console.log(chalk.blueBright(terminal_sign));
    console.log('\n');
} catch(err) {
    console.error(err);
}

['command_handler', 'event_handler'].forEach(events => {
    require(`./src/handler/${events}`)(client, Discord)
})


client.login(process.env.RIM_TOKEN)

