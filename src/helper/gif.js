let gif = {
    1: 'https://media.giphy.com/media/1wXgBZCZ52mtlWvz0k/giphy.gif',
    2: 'https://media.giphy.com/media/3o7bul4bNw60uhhQyI/giphy.gif',
    3: 'https://media.giphy.com/media/3o7btRkeE7RtAq8DnO/giphy.gif',
    4: 'https://media.giphy.com/media/3o7btRkeE7RtAq8DnO/giphy.gif',
    5: 'https://media.giphy.com/media/3o6gE8Fs8Lgel1ruCY/giphy.gif',
    6: 'https://c.tenor.com/NFJj75fKKSQAAAAd/tamako-good.gif',
    7: 'https://c.tenor.com/g3TAB8h_QgwAAAAC/good-anime.gif',
    8: 'https://c.tenor.com/QV2Dqkjw6t4AAAAC/kon-gambatte.gif',
    9: 'https://media.giphy.com/media/Pnmo3170vFepUPvGhN/giphy.gif',
    10:'https://media.giphy.com/media/zj0BxstyhGufC/giphy.gif',
    11: 'https://c.tenor.com/t61obx6y_b4AAAAd/anime-citrus.gif',
    12: 'https://c.tenor.com/QqwqhXmBAJwAAAAC/anime-happy.gif',
    13: 'https://c.tenor.com/GGdOX-9pLyAAAAAC/hyouka-smile.gif',
    14: 'https://c.tenor.com/mKTS5nbF1zcAAAAd/cute-anime-dancing.gif',
    15: 'https://c.tenor.com/LMxwdxg5Ba8AAAAC/gabriel-dropout.gif',
    16: 'https://c.tenor.com/TTzBJq1DsYkAAAAC/tohru-kobayashisan-chi-no-maid-dragon.gif',
    17: 'https://c.tenor.com/tjNaVhtjz4QAAAAC/black-hanekawa-anime.gif',
    18: 'https://c.tenor.com/fE85wBz8vOwAAAAC/black-hanekawa-wink.gif',
    19: 'https://c.tenor.com/6qCZDpBfG8AAAAAC/anime-chunibyo.gif',
    20: 'https://c.tenor.com/4S3ZSVQngtkAAAAC/hanekawa-nekomonogatari.gif'
}
module.exports =  {
    generateGifs(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        key = Math.floor(Math.random() * (max - min) + min);
        return gif[key];
    }
}