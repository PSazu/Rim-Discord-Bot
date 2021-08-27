const fs = require('fs');

module.exports = (client, Discord) => {
    const command_files = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
    console.log('⚙️' + '  Loading Commands...');
    console.log('⚙️' + '  Loading Events...');
    for(file of command_files) {
        const command = require(`../commands/${file}`);
        const file_name = file.match(/\w+/);
        console.log(' ↳ Imported command ' + file_name[0]);
        if(command.name) client.commands.set(command.name, command);
    } 

}