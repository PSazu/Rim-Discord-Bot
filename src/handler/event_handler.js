// module.exports = async (client) => {
//     console.log(`Logged in as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);

//     client.user.setActivity("Maintenance");
// };
const fs = require('fs');


module.exports = (client, Discord) => {
    const load_dir = (dirs) => {
        const event_files = fs.readdirSync(`./src/events/${dirs}`).filter(File => File.endsWith('.js'));
        for(const File of event_files) {
            const file_name = File.match(/\w+/);
            console.log(' ↳ Imported events ' + file_name);
            const event = require(`../events/${dirs}/${File}`);
            const event_name = File.split(".")[0];
            client.on(event_name, event.bind(null, Discord, client));
        }
    }
    ['client', 'guild'].forEach(dirs => load_dir(dirs));
} 