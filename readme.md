# Rim Discord Bot 

## Installation

First of all you need to [install Node.js](https://nodejs.org/en/download/) at least `v14.x.x` or install the latest LTS version from the official website for your platform. After you installed Node.js you need few more setups to work with it. 

1. Get Discord Bot Token  [here is the guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-token)
2. Main functional feature is music player so you definitely need YouTube Data API v3 [guide](https://developers.google.com/youtube/v3/getting-started)





## 🚀 Getting Started

```
git https://github.com/PSazu/Rim-Discord-Bot.git
cd Rim-Discord-Bot
npm install
```

After installing necessary packages you can start  Bot using `npm start or node Rim.js` command in terminal.

>Don't forget to put your token in .env file as `RIM_TOKEN = {TOKEN}` and your Youtube API key `YOUTUBE_API_KEY = {TOKEN}`


## Todo 

- [ ] Support mongoDB to store data for each user. For example storing user honor and ranks with date so that they can see their progress.
- [x] Music features ( Currently only supporting youtube) 
- [ ] Support spotify and soundcloud
- [ ] Save the music queue and playlist when I finish Database.
- [ ]Add configuration file so it can easily change bot prefix and any other api keys. 
- [x] CodeWars API support 






