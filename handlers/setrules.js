const {Group} = require('../database');
module.exports = async (ctx) => {
  const group = await Group.findOne({group_id: ctx.chat.id});
  if (!ctx.message.reply_to_message) {
    const answer = ctx.i18n.t('setrule.err');
    ctx.reply(answer,
        {reply_to_message_id: ctx.message.message_id});
  }
  if (ctx.message.reply_to_message) {
    try {
      group.rules = await ctx.message.reply_to_message.text;
      await group.save();
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
// TODO: check for the admin
