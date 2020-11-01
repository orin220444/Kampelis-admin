const {version} = require('../package.json');
export const handleTest = async (ctx) => {
  try {
    const answer = ctx.i18n.t('test', {
      user: ctx.from.first_name,
      chat: ctx.chat.title,
      user_id: ctx.from.id,
      version: version,
    });
    const message = await ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id},
    );
    setTimeout(() => {
      ctx.deleteMessage(message.message_id);
      ctx.deleteMessage(ctx.message.message_id);
    }, 5 * 1000);
  } catch (error) {
    const answer = ctx.i18n.t('error', {error: error});
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id},
    );
  }
};
