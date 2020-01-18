module.exports = async (ctx) => {
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


  if (isunbanUserAnAdmin == true) {
    try {
      const answer = ctx.i18n.t('unbanUserIsAnAdmin');
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
      await ctx.telegram.restrictChatMember(ctx.chat.id, unBanUser.id, {
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
      console.log(error);
    }
  }
};
