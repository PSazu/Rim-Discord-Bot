let gif = {
    1: 'https://media.giphy.com/media/1wXgBZCZ52mtlWvz0k/giphy.gif',
    2: 'https://media.giphy.com/media/3o7btRkeE7RtAq8DnO/giphy.gif',
    3: 'https://media.giphy.com/media/3o7btRkeE7RtAq8DnO/giphy.gif',
    4: 'https://media.giphy.com/media/3o6gE8Fs8Lgel1ruCY/giphy.gif',
    5: 'https://c.tenor.com/NFJj75fKKSQAAAAd/tamako-good.gif',
    6: 'https://c.tenor.com/g3TAB8h_QgwAAAAC/good-anime.gif',
    7: 'https://media.giphy.com/media/Pnmo3170vFepUPvGhN/giphy.gif',
    8:'https://media.giphy.com/media/zj0BxstyhGufC/giphy.gif',
    9: 'https://c.tenor.com/QqwqhXmBAJwAAAAC/anime-happy.gif',
    10: 'https://c.tenor.com/GGdOX-9pLyAAAAAC/hyouka-smile.gif',
    11: 'https://c.tenor.com/mKTS5nbF1zcAAAAd/cute-anime-dancing.gif',
    12: 'https://c.tenor.com/TTzBJq1DsYkAAAAC/tohru-kobayashisan-chi-no-maid-dragon.gif',
    13: 'https://c.tenor.com/tjNaVhtjz4QAAAAC/black-hanekawa-anime.gif',
    14: 'https://c.tenor.com/e1Ob-W-ZwQUAAAAi/girl-excited.gif', 
    15: 'https://c.tenor.com/A8Xon5cq5sQAAAAC/bell-cranel-dan-machi.gif',
    16: 'https://c.tenor.com/IyKy95tPdNgAAAAC/smiling-thinking.gif'
}
module.exports =  {
    generateGifs(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        key = Math.floor(Math.random() * (max - min) + min);
        return gif[key];
    }
}