module.exports = {
    name: 'prefix',
    execute(client, message, args) {
        if(args.length) {
         
          return message.channel.send('We are temprory disabled prefix change');
        }
        return message.channel.send({embed: {
          description: "The Rim's prefix set to: `~`",
          color: 0x009dc4 ,
      }});
    }
}