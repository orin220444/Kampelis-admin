const gifs = require('../config/gifs.json');
module.exports = (ctx) => {
  const gif = gifs.f;
  const randomGif = gif[Math.floor(Math.random() * gif.length)];
  ctx.replyWithDocument(randomGif);
};
