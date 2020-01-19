module.exports = (ctx) => {
  try {
    console.log(ctx.message.reply_to_message.animation.file_id);
  } catch (error) {
    const answer = ctx.i18n.t('error', {error: error});
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id},
    );
  }
};
