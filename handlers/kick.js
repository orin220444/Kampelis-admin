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

    if (iskickUserAnAdmin == true) {
      try {
        const answer = ctx.i18n.t('kickUserIsAnAdmin');
        ctx.reply(answer, {reply_to_message_id: ctx.message.message_id},
        );
      } catch (error) {
        const answer = ctx.i18n.t('error', {error: error});
        ctx.replyWithMarkdown(answer,
            {reply_to_message_id: ctx.message.message_id},
        );
      }
    }
    if (ischatMemberAnAdmin == false) {
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
        await ctx.telegram.unbanChatMember(ctx.chat.id, kickUser.user.id);
        const answer = await ctx.i18n.t('userKicked', {
          user: kickUser.first_name,
          user_id: kickUser.id,
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
