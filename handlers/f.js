const gifs = require('../config/gifs.json');
module.exports = (ctx) => {
  const gif = gifs.f;
  const randomGif = gif[Math.floor(Math.random() * gif.length)];
  ctx.replyWithDocument(randomGif);
  trycatch((error) => {
    const answer = ctx.i18n.t('error');
    ctx.replyWithMarkdown(answer);
  });
};
