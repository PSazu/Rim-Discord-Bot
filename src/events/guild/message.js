module.exports = (Discord, client, message) => {
    if(!message.content.startsWith('~') || message.author.bot) return ;
    const [command, ...args] = message.content.substring(1).split(' ');
        switch (command.toLowerCase()) {
        case 'codewars':
        case 'cw':
            if(args[1] === undefined || args[1].length === 0)  { 
                message.channel.send('`Usage:`~codewars | -command | `username`'); 
                return; 
            }
            findCommand(args[0], args[1], message, client, Discord);
            break;
    }
    //MUSIC
    findCommand(command.toLowerCase(), args, message, client, Discord);
}

function findCommand(alliesCommand, arg, message, client, Discord) {
    const cmd = client.commands.get(alliesCommand) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(alliesCommand));
    if(cmd) cmd.execute(client, message, arg, Discord);
    const queue = message.client.queue.get(message.guild.id);
    
}