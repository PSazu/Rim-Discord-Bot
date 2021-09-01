 const {fetchData} = require('../api/request');

module.exports = {
    name: '-kata',
    aliases: ['-k'],
    category: 'codewars', 
    formatter(arr) {
        let str = '';
        let counter = 1; 
        arr.forEach((element) => {
            let [kata, completedAt] = element;
            str += `${counter}` + ". " + kata + "   " + `(${completedAt.substring(0,10)})` + "\n \n";
            counter++;
        }) 
        return str
    },

    execute(client, message , args){
        fetchData(`http://www.codewars.com/api/v1/users/${args}/code-challenges/completed?page=0`).then(JSON =>{
            let arr = [];
            for(let i = 0; i < JSON.data.length; i++) {
              if(arr.length === 10) { break;}
              arr.push([JSON['data'][i]['name'],JSON['data'][i]['completedAt']]);
            }
            const description = this.formatter(arr);
            message.channel.send({
                embed:{
                    author: {name: 'Codewars',icon_url: 'https://cdn.discordapp.com/attachments/808327538291900416/872458877126475826/codewars.png'},
                    title: args,
                    color: 0x0099ff,
                    description: description
                    ,footer: {
                        text: message.author.tag, 
                        icon_url:  message.author.displayAvatarURL()
                    }
                }
            })
        })
        .catch(Error => {
            message.reply('failed to load request :)');
            console.log(Error.message);
          });
    }
}