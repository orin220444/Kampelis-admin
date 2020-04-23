module.exports = (ctx) => {
  if (!ctx.message.reply_to_message) {
    try {
      const answer = ctx.i18n.t('id.err');
      ctx.reply(answer);
    } catch (error) {
      const answer = ctx.i18n.t('error', {error: error});
      ctx.replyWithMarkdown(answer);
    }
  } else {
    if (ctx.message.reply_to_message.sticker) {
      try {
        ctx.reply(ctx.message.reply_to_message.sticker,
            {reply_to_message_id: ctx.message.message_id});
      } catch (error) {
        const answer = ctx.i18n.t('error', {error: error});
        ctx.replyWithMarkdown(answer);
      }
    }

    if (ctx.message.reply_to_message.animation) {
      try {
        ctx.reply(ctx.message.reply_to_message.animation,
            {reply_to_message_id: ctx.message.message_id});
      } catch (error) {
        const answer = ctx.i18n.t('error', {error: error});
        ctx.replyWithMarkdown(answer);
      }
    }
  }
};
