const files = require('../config/files.json');
module.exports = (ctx) => {
  try {
    const sticker = files.durka;
    const randomSticker = sticker[Math.floor(Math.random() * sticker.length)];
    ctx.replyWithSticker(randomSticker,
        {reply_to_message_id: ctx.message.reply_to_message.message_id},
    );
  } catch (error) {
    const answer = ctx.i18n.t('error', {error: error});
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id},
    );
  }
};
