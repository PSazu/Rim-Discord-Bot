module.exports = {
    name: 'skipto',
    aliases: ['st'],
    execute(client, message) {
        const queue = message.client.queue.get(message.guild.id);
        message.channel.send("Кодыг нь арай бичээгүй байгаа 😂");
    }
}