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
    try {
      const answer = ctx.i18n.t('kickUserIsAnAdmin');
      ctx.reply(answer);
    } catch (error) {
      console.log(error);
    }
  }
  if (ischatMemberAnAdmin == false) {
    try {
      const answer = ctx.i18n.t('chatMemberIsNotAnAdmin');
      ctx.reply(answer);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await ctx.telegram.kickChatMember(ctx.chat.id, kickUser.id);
      await ctx.telegram.unbanChatMember(ctx.chat.id, kickUser.id);
      const answer = await ctx.i18n.t('userKicked', {
        user: kickUser.first_name,
        user_id: kickUser.id,
      });
      await ctx.replyWithMarkdown(answer);
    } catch (error) {
      console.log(error);
    }
  }
};
