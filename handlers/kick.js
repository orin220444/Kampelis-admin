module.exports = async (ctx) => {
  if (!ctx.message.reply_to_message) {
    const answer = ctx.i18n.t('nobodytokick');
    ctx.reply(answer,
        {reply_to_message_id: ctx.message.message_id});
  } else {
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
    console.log(kickUser.status);
    console.log(kickUser);
    console.log(chatMember.status);
    console.log(chatMember);
    const a = true;
    let answer = '';
    try {
      switch (a) {
        case iskickUserAnAdmin:
          answer = ctx.i18n.t('kickUserIsAnAdmin');
          ctx.reply(answer, {reply_to_message_id: ctx.message.message_id},
          );
          break;
        case !ischatMemberAnAdmin:
          answer = ctx.i18n.t('chatMemberIsNotAnAdmin');
          ctx.reply(answer, {reply_to_message_id: ctx.message.message_id},
          );
        default:
          await ctx.telegram.kickChatMember(ctx.chat.id, kickUser.user.id);
          await ctx.telegram.unbanChatMember(ctx.chat.id, kickUser.user.id);
          answer = await ctx.i18n.t('userKicked', {
            user: kickUser.user.first_name,
            user_id: kickUser.user.id,
          });
          await ctx.replyWithMarkdown(answer,
              {reply_to_message_id: ctx.message.message_id},
          );
      }
    } catch (error) {
      const answer = ctx.i18n.t('error', {error: error});
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    }
  }
};

