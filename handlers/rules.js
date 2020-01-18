const fs = require('fs');
module.exports = async (ctx) => {
  const rule = fs.readFileSync('./config/rules.txt', 'utf8');
  if (rule !== '') {
    try {
      ctx.reply(rule,
          {reply_to_message_id: ctx.message.message_id},
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const answer = ctx.i18n.t('rule.err');
      ctx.reply(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    } catch (error) {
      console.log(error);
    }
  }
};
