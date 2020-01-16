const {User} = require('./database.js');
module.exports = async (ctx) => {
  const user = await User.findOne({id: ctx.from.id});
  if (!user) {
    const user = await User.create({
      username: ctx.from.username,
      id: ctx.from.id,
      firstname: ctx.from.first_name,

    });
    user.save();
    const answer = ctx.i18n.t('newChatMembers', {
      user: ctx.from.first_name,
      chat: ctx.chat.title,
      user_id: ctx.from.id,
    });
    ctx.replyWithMarkdown(answer);
  } else {
    const answer = ctx.i18n.t('returnedChatMembers', {
      user: ctx.from.first_name,
      chat: ctx.chat.title,
      user_id: ctx.from.id,
    });
    ctx.replyWithMarkdown(answer);
  }
};
