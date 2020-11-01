export const handleShrug = (ctx) => {
  try {
    const answer = ctx.i18n.t('shrug');
    ctx.reply(answer,
        {reply_to_message_id: ctx.message.message_id},
    );
  } catch (error) {
    const answer = ctx.i18n.t('error', {error: error});
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id},
    );
  }
};
// TODO: regexp
