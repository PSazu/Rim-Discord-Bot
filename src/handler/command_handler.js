 const fs = require('fs');

module.exports = (client, Discord) => {
    console.log('⚙️' + '  Loading Commands...');
    console.log('⚙️' + '  Loading Events...');
    readCommands('./src/commands/codewars/', '../commands/codewars/', client);
    readCommands('./src/commands/music/', '../commands/music/', client);
    // I really need to learn about async, synchronous programming technique.
}

function readCommands(path, requirePath, client) {
    const command_files = fs.readdirSync(path).filter(file => file.endsWith('.js'));
    for(file of command_files) {
        const command = require(requirePath + file);
        const file_name = file.match(/\w+/);
        console.log(' ↳ Imported command ' + file_name[0]);
        if(command.name) client.commands.set(command.name, command);
    } 
}