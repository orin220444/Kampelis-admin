import {Group} from '../database.js';
export const handleSetRules = async (ctx) => {
  const group = await Group.findOne({group_id: ctx.chat.id});
  const chatMember = await ctx.telegram.getChatMember(
      ctx.message.chat.id, ctx.message.from.id,
  );
  const isChatMemberAnAdmin =
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
    console.log(isChatMemberAnAdmin);
    if (!ctx.message.reply_to_message) {
      try {
        const answer = ctx.i18n.t('setRule.err');
        ctx.reply(answer,
            {reply_to_message_id: ctx.message.message_id});
      } catch (error) {
        const answer = ctx.i18n.t('error', {error: error});
        ctx.replyWithMarkdown(answer,
            {reply_to_message_id: ctx.message.message_id},
        );
      }
    }
    if (isChatMemberAnAdmin) {
      if (ctx.message.reply_to_message) {
        try {
          group.rules = await ctx.message.reply_to_message.text;
          await group.save();
          const answer = ctx.i18n.t('setRule.suc');
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
          const answer = ctx.i18n.t('setRule.notAnAdmin');
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
// TODO: check
