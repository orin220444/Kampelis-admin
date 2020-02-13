const {version} = require('../package.json');
module.exports = (ctx) => {
  try {
    console.log(ctx);
    ctx.i18n.locale('en');
    const answer = ctx.i18n.t('test', {user: ctx.from.first_name,
      chat: ctx.chat.title,
      user_id: ctx.from.id,
      version: version});
    ctx.replyWithMarkdown(answer);
  } catch (error) {
    const answer = ctx.i18n.t('error', {error: error});
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id});
  }
};
