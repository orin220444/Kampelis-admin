module.exports = (ctx) => {
  try {
    const answer = ctx.i18n.t('shrug');
    ctx.reply(answer);
  } catch (error) {
    console.log(error);
  }
};
// TODO: regexp
