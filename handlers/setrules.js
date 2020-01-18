const fs = require('fs');
module.exports = async (ctx) => {
  if (!ctx.message.reply_to_message) {
    const answer = ctx.i18n.t('setrule.err');
    ctx.reply(answer,
        {reply_to_message_id: ctx.message.message_id});
  }
  if (ctx.message.reply_to_message) {
    try {
      console.log(ctx.message.reply_to_message.text);
      const data = `${ctx.message.reply_to_message.text}`;
      fs.writeFile('./config/rules.txt', data, function(err) {
        if (err) throw err;
      });
      const answer = ctx.i18n.t('setrule.suc');
      await ctx.reply(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    } catch (error) {
      const answer = ctx.i18n.t('error', {error: error});
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    }
  }
};
