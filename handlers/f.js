const files = require('../config/files.json');
//TODO: CONVERT TO ESM

export default (ctx) => {
  try {
    const gif = files.f;
    const randomGif = gif[Math.floor(Math.random() * gif.length)];
    const isReply = !!ctx.message.reply_to_message;
    const message = isReply ?
      ctx.message.reply_to_message.message_id :
      ctx.message.message_id;
    ctx.replyWithDocument(randomGif,
        {reply_to_message_id: message},
    );
  } catch (error) {
    const answer = ctx.i18n.t('error', {error: error});
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id},
    );
  };
};
