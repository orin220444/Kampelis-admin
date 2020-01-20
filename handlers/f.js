const gifs = require('../config/gifs.json');
module.exports = (ctx) => {
  try {
    const gif = gifs.f;
    console.log(gif);
    console.log(gif.length);
    const randomGif = gif[Math.floor(Math.random() * gif.length)];
    console.log(randomGif);
    ctx.replyWithDocument(randomGif,
        {reply_to_message_id: ctx.message.message_id},
    );
  } catch (error) {
    const answer = ctx.i18n.t('error', {error: error});
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id},
    );
  };
};
