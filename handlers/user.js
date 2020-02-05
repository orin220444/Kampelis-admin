const {User} = require('../database.js');
module.exports = async (ctx) => {
  if (!ctx.message.reply_to_message) {
    try {
      const answer = ctx.i18n.t('user.noreply');
      ctx.reply(answer);
    } catch (error) {
      const answer = ctx.i18n.t('error', {error: error});
      ctx.replyWithMarkdown(answer);
    }
  } else {
    const user = await User.findOne({id: ctx.from.id});
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
    } else {
      try {
        const answer = ctx.i18n.t('user.info', {
          user_id: user.id,
          user_username: user.username,
          user_firstname: user.firstname,
        });
        ctx.reply(answer);
      } catch (error) {
        const answer = ctx.i18n.t('error', {error: error});
        ctx.replyWithMarkdown(answer);
      }
    }
  }
};
