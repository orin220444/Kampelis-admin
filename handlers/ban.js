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
    const answer = ctx.i18n.t('banUserIsAnAdmin');
    ctx.reply(answer);
  }
  if (ischatMemberAnAdmin == false) {
    const answer = ctx.i18n.t('chatMemberIsNotAnAdmin');
    ctx.reply(answer);
  } else {
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
  }
  trycatch((error) => {
    const answer = ctx.i18n.t('error', {error});
    ctx.replyWithMarkdown(answer);
  });
};
