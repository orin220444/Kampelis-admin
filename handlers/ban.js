module.exports = async (ctx) => {
  if (!ctx.message.reply_to_message) {
    const answer = ctx.i18n.t('ban.nobodyToBan');
    ctx.reply(answer,
        {reply_to_message_id: ctx.message.message_id});
  } else {
    const chatMember = await ctx.telegram.getChatMember(
        ctx.message.chat.id, ctx.message.from.id,
    );
    const banUser = await ctx.telegram.getChatMember(
        ctx.message.chat.id, ctx.message.reply_to_message.from.id,
    );
    const isChatMemberAnAdmin =
   await chatMember.status === 'creator' || 'administrator';
    const isBanUserAnAdmin =
   await banUser.status === 'creator' || 'administrator';
    console.log(banUser.status);
    console.log(banUser);
    console.log(chatMember.status);
    console.log(chatMember);

    if (isBanUserAnAdmin) {
      try {
        const answer = ctx.i18n.t('ban.UserIsAnAdmin');
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
    if (!isChatMemberAnAdmin) {
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
        await ban(ctx.chat.id, banUser.user.id);
        const answer = await ctx.i18n.t('ban.suc', {
          user: banUser.user.first_name,
          user_id: banUser.user.id,
        });
        await ctx.replyWithMarkdown(answer);
      } catch (error) {
        const answer = ctx.i18n.t('error', {error: error});
        ctx.replyWithMarkdown(answer,
            {reply_to_message_id: ctx.message.message_id},
        );
      }
    }
  };

  // functions
  /**
   * bans a chat member
   * @param {number} user telegram user id
   * @param {number} group telegram chat id
   */
  async function ban(user, group) {
    await ctx.telegram.restrictChatMember(group, user, {
      can_send_messages: false,
      can_send_other_messages: false,
      can_send_media_messages: false,
      can_add_web_page_previews: false,
    });
  }
};
