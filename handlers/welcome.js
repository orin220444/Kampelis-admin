const {User, Group} = require('../database.js');
module.exports = async (ctx) => {
  const user = await User.findOne({id: ctx.from.id});
  const group = await Group.findOne({group_id: ctx.chat.id});
  if (!user) {
    try {
      const user = await User.create({
        username: ctx.from.username,
        id: ctx.from.id,
        firstname: ctx.from.first_name,
      });
      await user.save();
    } catch (error) {
      const answer = ctx.i18n.t('error', {error: error});
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    }
  }
  if (!group) {
    try {
      const group = await Group.create({
        group_id: ctx.chat.id,
        title: ctx.chat.title,

      });
      await group.save();
    } catch (error) {
      const answer = ctx.i18n.t('error', {error: error});
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    }
  }
  try {
    const answer = ctx.i18n.t('newChatMembers', {
      user: ctx.from.first_name,
      chat: ctx.chat.title,
      user_id: user.id,
    });
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id});
  } catch (error) {
    const answer = ctx.i18n.t('error', {error: error});
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id},
    );
  }
};
