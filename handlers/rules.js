const rules = require('../config/rules.json');
module.exports = (ctx) => {
  const rule = rules/rule;
  if (rule !== '') {
    ctx.reply(rule, {reply_to_message_id: ctx.message.message_id});
  } else {
    const answer = ctx.i18n.t('rule.err');
    ctx.reply(answer, {reply_to_message_id: ctx.message.message_id});
  }
};
