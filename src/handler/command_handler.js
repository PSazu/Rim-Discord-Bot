const fs = require('fs');

module.exports = (client, Discord) => {
    const command_files = fs.readdirSync('./src/codewars/').filter(file => file.endsWith('.js'));
    for(file of command_files) {
        console.log("Loading command files" + file);
        const command = require(`../codewars/${file}`);
        if(command.name) client.commands.set(command.name, command);
    } 
}