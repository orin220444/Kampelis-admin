module.exports = (ctx) => {
  const answer = ctx.i18n.t('test', {
    user: ctx.from.first_name,
    chat: ctx.chat.title,
    user_id: ctx.from.id,
  });
  ctx.replyWithMarkdown(answer);
  trycatch((error) => {
    const answer = ctx.i18n.t('error');
    ctx.replyWithMarkdown(answer);
  });
};
