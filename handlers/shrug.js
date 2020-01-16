module.exports = (ctx) => {
  const answer = ctx.i18n.t('shrug');
  ctx.reply(answer);
};
