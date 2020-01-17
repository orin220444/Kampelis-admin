module.exports = (ctx) => {
  try {
    const answer = ctx.i18n.t('help');
    ctx.reply(answer);
  } catch (error) {
    console.log(error);
  }
};
