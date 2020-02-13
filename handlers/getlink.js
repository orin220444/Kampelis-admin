module.exports = async (ctx) => {
  try {
    const chatLink = await ctx.telegram.exportChatInviteLink(ctx.chat.id);
    ctx.reply(chatLink, {
      reply_to_message_id: ctx.message.message_id,
    });
  } catch (error) {
    const answer = ctx.i18n.t('error', {error: error});
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id});
  }
  try {
    const admins = await ctx.telegram.getChatAdministrators(ctx.chat.id);
    let i = 0;
    const answer = `Пользователь @${ctx.from.username} запросил ссылку!`;
    while (i < admins.length) {
      ctx.telegram.sendMessage(admins[i].user.id, answer);
      i++;
    }
  } catch (error) {
    const answer = ctx.i18n.t('error', {error: error});
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id});
  }
};
