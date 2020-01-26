module.exports = async (ctx) => {
  if (!ctx.message.reply_to_message) {
    const answer = ctx.i18n.t('nobodytounban');
    ctx.reply(answer,
        {reply_to_message_id: ctx.message.message_id});
  } else {
    const chatMember = await ctx.telegram.getChatMember(
        ctx.message.chat.id, ctx.message.from.id,
    );
    const unBanUser = await ctx.telegram.getChatMember(
        ctx.message.chat.id, ctx.message.reply_to_message.from.id,
    );
    const ischatMemberAnAdmin =
   await chatMember.status === 'creator' || 'administrator';
    const isunbanUserAnAdmin =
   await unBanUser.status === 'creator' || 'administrator';


    if (isunbanUserAnAdmin) {
      try {
        const answer = ctx.i18n.t('unbanUserIsAnAdmin');
        ctx.reply(answer,
            {reply_to_message_id: ctx.message.message_id},
        );
      } catch (error) {
        const answer = ctx.i18n.t('error', {error: error});
        ctx.replyWithMarkdown(answer,
            {reply_to_message_id: ctx.message.message_id},
        );
      }
    }
    if (!ischatMemberAnAdmin) {
      try {
        const answer = ctx.i18n.t('chatMemberIsNotAnAdmin');
        ctx.reply(answer,
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
        await ctx.telegram.restrictChatMember(ctx.chat.id, unBanUser.user.id, {
          can_send_messages: true,
          can_send_other_messages: true,
          can_send_media_messages: true,
          can_add_web_page_previews: true,
        });
        const answer = await ctx.i18n.t('userUnBanned', {
          user: ctx.message.reply_to_message.from.first_name,
          user_id: unBanUser.id,
        });
        await ctx.replyWithMarkdown(answer,
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
};
