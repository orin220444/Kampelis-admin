const fs = require('fs');
module.exports = async (ctx) => {
  if (!ctx.message.reply_to_message) {
    const answer = ctx.i18n.t('setrule.err');
    ctx.reply(answer);
  }
  if (ctx.message.reply_to_message) {
    try {
      console.log(ctx.message.reply_to_message.text);
      const data = `${ctx.message.reply_to_message.text}`;
      fs.writeFile('./config/rules.txt', data, function(err) {
        if (err) throw err;
      });
      const answer = ctx.i18n.t('setrule.suc');
      await ctx.reply(answer);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const answer = ctx.i18n.t('error');
      ctx.reply(answer);
      console.log(error);
    } catch (error) {
      console.log(error);
    };
  }
};
