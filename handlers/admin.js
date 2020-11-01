export const handleAdmin = async (ctx) => {
  try {
    const admins = await ctx.telegram.getChatAdministrators(ctx.chat.id);
    let i = 0;
    let mentions = ' ';
    while (i < admins.length) {
      mentions = ` [\ ](tg://user?id=${admins[i].user.id})` + mentions;
      i++;
    }

    const answer = '@admin' + mentions;
    ctx.replyWithMarkdown(answer);
  } catch (error) {
    const answer = ctx.i18n.t('error', {error: error});
    ctx.replyWithMarkdown(answer, {
      reply_to_message_id: ctx.message.message_id,
    });
  }
};
// FIXME: only tags last active 5 admins
