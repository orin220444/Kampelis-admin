module.exports = async (ctx) => {
  const answer = ctx.i18n.t('newChatMembers', {
    user: ctx.from.first_name,
    chat: ctx.chat.title,
    user_id: ctx.from.id,
  });
  ctx.replyWithMarkdown(answer);
};
