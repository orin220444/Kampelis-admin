module.exports = async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(
      ctx.message.chat.id, ctx.message.from.id,
  );
  const kickUser = await ctx.telegram.getChatMember(
      ctx.chat.id, ctx.message.reply_to_message.from.id,
  );
  const ischatMemberAnAdmin =
    await chatMember.status === 'creator' || 'administrator';
  const iskickUserAnAdmin =
    await kickUser.status === 'creator' || 'administrator';


  if (iskickUserAnAdmin == true) {
    const answer = ctx.i18n.t('kickUserIsAnAdmin');
    ctx.reply(answer);
  }
  if (ischatMemberAnAdmin == false) {
    const answer = ctx.i18n.t('chatMemberIsNotAnAdmin');
    ctx.reply(answer);
  } else {
    await ctx.telegram.kickChatMember(ctx.chat.id, kickUser.id);
    const answer = await ctx.i18n.t('userKicked', {
      user: kickUser.first_name,
      user_id: kickUser.id,
    });
    await ctx.replyWithMarkdown(answer);
  }
  trycatch((error) => {
    const answer = ctx.i18n.t('error', {error});
    ctx.replyWithMarkdown(answer);
  });
};
