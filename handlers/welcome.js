const {User, Group} = require('../database.js');
module.exports = async (ctx) => {
  const user = await User.findOne({id: ctx.new_chat_member.id});
  const group = await Group.findOne({group_id: ctx.chat.id});
  console.log(ctx.message)
  if (!user) {
    try {
      const user = await User.create({
        username: ctx.message.new_chat_member.username,
        id: ctx.message.new_chat_member.id,
        firstname: ctx.message.new_chat_member.first_name,
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
      user: ctx.message.new_chat_member.first_name,
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
