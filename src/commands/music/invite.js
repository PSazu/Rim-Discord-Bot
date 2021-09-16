module.exports = {
    name: 'invite',
    execute(client, message) {
        message.channel.send(`https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=137475968065&scope=bot`);
    }
}