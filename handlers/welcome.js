const {User} = require('../database.js');
module.exports = async (ctx) => {
  const user = await User.findOne({id: ctx.from.id});
  if (!user) {
    try {
      const user = await User.create({
        username: ctx.from.username,
        id: ctx.from.id,
        firstname: ctx.from.first_name,

      });
      await user.save();
    } catch (error) {
      console.log(error);
    }
    try {
      const answer = ctx.i18n.t('newChatMembers', {
        user: user.firstname,
        chat: ctx.chat.title,
        user_id: user.id,
      });
      ctx.replyWithMarkdown(answer, {reply_to_message_id: ctx.message.message_id});
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const answer = ctx.i18n.t('returnedChatMembers', {
        user: user.firstname,
        chat: ctx.chat.title,
        user_id: user.id,
      });
      ctx.replyWithMarkdown(answer, {reply_to_message_id: ctx.message.message_id});
    } catch (error) {
    }
  }
};
