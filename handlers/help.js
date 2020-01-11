module.exports = async (ctx) => {
  const answer = ctx.i18n.t('help');
  ctx.reply(answer);
};
