module.exports = async (ctx) => {
  const answer = ctx.i18n.t('help');
  ctx.reply(answer);
  trycatch((error) => {
    const answer = ctx.i18n.t('error');
    ctx.replyWithMarkdown(answer);
  });
};
