module.exports = async (ctx) => {
  if (!ctx.message.reply_to_message) {
    nobodyToBan(ctx.message);
  } else {
    const isChatMemberAnAdmin = await checkIsAnAdmin(
        ctx.message.chat.id, ctx.message.from.id,
    );
    const isBanUserAnAdmin = await checkIsAnAdmin(
        ctx.message.chat.id, ctx.message.reply_to_message.from.id,
    );
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
  /**
   * checks is a reply to the user to ban
   * @param {any} message the message object
  */
  function nobodyToBan(message) {
    const answer = ctx.i18n.t('ban.nobodyToBan');
    ctx.reply(answer,
        {reply_to_message_id: message.message_id});
  }
  /**
   * gets user info and checks is user an admin
   * @param {number} chat telegram chat id
   * @param {number} userId telegram user id
  */
  async function checkIsAnAdmin(chat, userId) {
    const user = await ctx.telegram.getChatMember(chat, userId);
    const isUserAnAdmin =
   await user.status === 'creator' || 'administrator';

    console.log(user.status);
    console.log(user);
    console.log(isUserAnAdmin);
    return isUserAnAdmin;
  }
};
