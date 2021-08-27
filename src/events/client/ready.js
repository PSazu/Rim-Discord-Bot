const chalk = require('chalk');
module.exports = (Discord, client) => {
    console.log(chalk.greenBright(['[SUCCESSFUL] ']) + `Logged in as ${client.user.tag}. Ready on ${client.guilds.cache.size} servers`);
}