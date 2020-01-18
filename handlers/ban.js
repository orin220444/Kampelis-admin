module.exports = async (ctx) => {
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

  if (isbanUserAnAdmin == true) {
    try {
      const answer = ctx.i18n.t('banUserIsAnAdmin');
      ctx.reply(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    } catch (error) {
      console.log(error);
    }
  }
  if (ischatMemberAnAdmin == false) {
    try {
      const answer = ctx.i18n.t('chatMemberIsNotAnAdmin');
      ctx.reply(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await ctx.telegram.restrictChatMember(ctx.chat.id, banUser.id, {
        can_send_messages: false,
        can_send_other_messages: false,
        can_send_media_messages: false,
        can_add_web_page_previews: false,
      });
      const answer = await ctx.i18n.t('userBanned', {
        user: banUser.first_name,
        user_id: banUser.id,
      });
      await ctx.replyWithMarkdown(answer);
    } catch (error) {
      console.log(error);
    }
  }
};
