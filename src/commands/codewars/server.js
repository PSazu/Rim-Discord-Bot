module.exports = {
    name: 'server',
    execute(client, message) {
        message.channel.send(`Rim bot active in ${client.guilds.cache.size} servers`);
    }
}