const files = require('../config/files.json');
module.exports = (ctx) => {
  try {
    const gif = files.f;
    const randomGif = gif[Math.floor(Math.random() * gif.length)];
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
