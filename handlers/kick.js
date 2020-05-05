module.exports = async (ctx) => {
  if (!ctx.message.reply_to_message) {
    const answer = ctx.i18n.t('kick.nobodyToKick');
    ctx.reply(answer,
        {reply_to_message_id: ctx.message.message_id});
  } else {
    const chatMember = await ctx.telegram.getChatMember(
        ctx.message.chat.id, ctx.message.from.id,
    );
    const kickUser = await ctx.telegram.getChatMember(
        ctx.chat.id, ctx.message.reply_to_message.from.id,
    );
    const isChatMemberAnAdmin =
    await chatMember.status === 'creator' || 'administrator';
    const isKickUserAnAdmin =
    await kickUser.status === 'creator' || 'administrator';
    console.log(kickUser.status);
    console.log(kickUser);
    console.log(chatMember.status);
    console.log(chatMember);
    if (isKickUserAnAdmin) {
      try {
        const answer = ctx.i18n.t('kick.UserIsAnAdmin');
        ctx.reply(answer, {reply_to_message_id: ctx.message.message_id},
        );
      } catch (error) {
        const answer = ctx.i18n.t('error', {error: error});
        ctx.replyWithMarkdown(answer,
            {reply_to_message_id: ctx.message.message_id},
        );
      }
    } else if (!isChatMemberAnAdmin) {
      try {
        const answer = ctx.i18n.t('chatMemberIsNotAnAdmin');
        ctx.reply(answer, {reply_to_message_id: ctx.message.message_id},
        );
      } catch (error) {
        const answer = ctx.i18n.t('error', {error: error});
        ctx.replyWithMarkdown(answer,
            {reply_to_message_id: ctx.message.message_id},
        );
      }
    } else {
      try {
        await ctx.telegram.kickChatMember(ctx.chat.id, kickUser.user.id);
        await ctx.telegram.unBanChatMember(ctx.chat.id, kickUser.user.id);
        const answer = await ctx.i18n.t('kick.suc', {
          user: kickUser.user.first_name,
          user_id: kickUser.user.id,
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
