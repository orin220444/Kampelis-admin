const {Group} = require('../database');
module.exports = async (ctx) => {
  const group = await Group.findOne({group_id: ctx.chat.id});
  const chatMember = await ctx.telegram.getChatMember(
      ctx.message.chat.id, ctx.message.from.id,
  );
  const ischatMemberAnAdmin =
await chatMember.status === 'creator' || 'administrator';

  if (!group) {
    try {
      const answer = ctx.i18n.t('group.notfound');
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    } catch (error) {
      const answer = ctx.i18n.t('error', {error: error});
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    }
  } else {
    console.log(chatMember);
    console.log(ischatMemberAnAdmin);
    if (!ctx.message.reply_to_message) {
      try {
        const answer = ctx.i18n.t('setrule.err');
        ctx.reply(answer,
            {reply_to_message_id: ctx.message.message_id});
      } catch (error) {
        const answer = ctx.i18n.t('error', {error: error});
        ctx.replyWithMarkdown(answer,
            {reply_to_message_id: ctx.message.message_id},
        );
      }
    }
    if (ischatMemberAnAdmin) {
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
      } else {
        try {
          const answer = ctx.i18n.t('setrule.notaadmin');
          ctx.replyWithMarkdown(answer,
              {reply_to_message_id: ctx.message.message_id},
          );
        } catch (error) {
          const answer = ctx.i18n.t('error', {error: error});
          ctx.replyWithMarkdown(answer,
              {reply_to_message_id: ctx.message.message_id},
          );
        }
      }
    }
  };
};
