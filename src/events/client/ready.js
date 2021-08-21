module.exports = (Discord, client) => {
    console.log(`Logged in as ${client.user.tag}. Ready on ${client.guilds.cache.size} servers`);
}