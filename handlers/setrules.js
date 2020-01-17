module.exports = async (ctx) => {
  if (!ctx.message.reply_to_message) {
    const answer = ctx.i18n.t('setrule.err');
    ctx.reply(answer);
  } else {
    const data = `{rule: ${ctx.message.text}}`;
    const answer = ctx.i18n.t('setrule.suc');
    fs.writeFile('../config/rules.json', data, function(err) {
      if (err) throw err;
    });
    await ctx.reply(answer);
  }
};
