module.exports = (ctx) => {
  if (!ctx.message.reply_to_message) {
    try {
      ctx.reply(ctx.message.reply_to_message,
          {reply_to_message_id: ctx.message.message.id});
    } catch (error) {
      const answer = ctx.i18n.t(error, {error: error});
      ctx.replyWithMarkdown(answer);
    }
  }
};
