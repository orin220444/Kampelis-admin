module.exports = async (ctx) => {
  if (!ctx.message.reply_to_message) {
    const answer = ctx.i18n.t('nobodytoban');
    ctx.reply(answer,
        {reply_to_message_id: ctx.message.message_id});
  } else {
    const chatMember = await ctx.telegram.getChatMember(
        ctx.message.chat.id, ctx.message.from.id,
    );
    const banUser = await ctx.telegram.getChatMember(
        ctx.message.chat.id, ctx.message.reply_to_message.from.id,
    );
    const ischatMemberAnAdmin =
   await chatMember.status === 'creator' || 'administrator';
    const isbanUserAnAdmin =
   await banUser.status === 'creator' || 'administrator';
    console.log(kickUser.status);
    console.log(kickUser);
    console.log(chatMember.status);
    console.log(chatMember);
    const a = true;
    try {
      let answer = '';
      switch (a) {
        case isbanUserAnAdmin:

          answer = ctx.i18n.t('banUserIsAnAdmin');
          ctx.reply(answer,
              {reply_to_message_id: ctx.message.message_id},
          );
          break;
        case (!ischatMemberAnAdmin):

          answer = ctx.i18n.t('chatMemberIsNotAnAdmin');
          ctx.reply(answer,
              {reply_to_message_id: ctx.message.message_id},
          );
          break;
        default:

          await ctx.telegram.restrictChatMember(ctx.chat.id, banUser.user.id, {
            can_send_messages: false,
            can_send_other_messages: false,
            can_send_media_messages: false,
            can_add_web_page_previews: false,
          });
          answer = await ctx.i18n.t('userBanned', {
            user: banUser.user.first_name,
            user_id: banUser.user.id,
          });
          await ctx.replyWithMarkdown(answer);
          break;
      }
    } catch (error) {
      const answer = ctx.i18n.t('error', {error: error});
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    }
  }
};

