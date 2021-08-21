module.exports = (Discord, client, message) => {
    if(!message.content.startsWith('~') || message.author.bot) return ;
    const [command, ...args] = message.content.substring(1).split(' ');
    switch (command.toLowerCase()) {
        case 'codewars':
        case 'cw':
            const cmd = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]))
            if(cmd) cmd.execute(client, message, args[1], Discord);
            break;
    }
}