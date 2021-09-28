 const fs = require('fs');

module.exports = (client, Discord) => {
    console.log('⚙️' + '  Loading Commands...');
    console.log('⚙️' + '  Loading Events...');
    
    fs.readdirSync('./src/commands').forEach(dirs => {
        const commands = fs.readdirSync(`./src/commands/${dirs}`);

        for(const file of commands) {
            const command = require(`../commands/${dirs}/${file}`);
            console.log(' ↳ Imported command ' + file);
            client.commands.set(command.name, command);
        }
    });
}