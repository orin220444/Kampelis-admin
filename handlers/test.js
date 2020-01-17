const {version} = require('../package.json');
module.exports = (ctx) => {
  const answer = ctx.i18n.t('test', {
    user: ctx.from.first_name,
    chat: ctx.chat.title,
    user_id: ctx.from.id,
    version: version,
  });
  ctx.replyWithMarkdown(answer);
  setTimeout(() => {
    // FIXME: autodeleting
    ctx.deleteMessage(ctx.message.message_id);
  }, 5 * 1000);
};