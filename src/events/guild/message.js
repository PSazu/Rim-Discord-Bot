module.exports = (Discord, client, message) => {
    if(!message.content.startsWith('~') || message.author.bot) return ;
    const [command, ...args] = message.content.substring(1).split(' ');
    findCommand(command.toLowerCase(), args, message, client, Discord);
}

function findCommand(alliesCommand, arg, message, client, Discord) {
    const cmd = client.commands.get(alliesCommand) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(alliesCommand));
    if(cmd) cmd.execute(client, message, arg, Discord);
}