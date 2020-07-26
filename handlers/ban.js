module.exports = async (ctx) => {
  if (!ctx.message.reply_to_message) {
    nobodyToBan(ctx.message);
  } else {
    const banUser = ctx.message.reply_to_message.from;
    const admin = ctx.message.from;
await Promise.all([
    const isChatMemberAnAdmin = checkIsAnAdmin(
        ctx.chat.id, admin.id,
    ),
    const isBanUserAnAdmin = checkIsAnAdmin(
        ctx.chat.id, banUser.id,
    ),
]).then(

    const isBanUserABot = checkIsABot(
        banUser,
    );
    if (isBanUserABot) {
      try {
        const answer = ctx.i18n.t('ban.UserIsABot');
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
          await ban(ctx.chat.id, banUser.id);
          const answer = await ctx.i18n.t('ban.suc', {
            user: banUser.first_name,
            user_id: banUser.id,
          });
          await ctx.replyWithMarkdown(answer);
        } catch (error) {
          const answer = ctx.i18n.t('error', {error: error});
          ctx.replyWithMarkdown(answer,
              {reply_to_message_id: ctx.message.message_id},
          );
        )}
      }
    };
  }
  // functions

  /**
   * bans a chat member
   * @param {number} group telegram chat id
   * @param {number} user telegram user id
   */
  async function ban(group, user) {
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
(user.status === 'creator' || user.status === 'administrator') ? true : false;

    console.log(user.user);
    console.log(user.status);
    console.log(isUserAnAdmin);
    return isUserAnAdmin;
  }
  /**
  * checks is user a bot
  * @param {any} user telegram user
  * @return {boolean} is user a bot
  */
  function checkIsABot(user) {
    console.log(user.is_bot);
    const isABot = user.is_bot;
    console.log('isABot', isABot);
    return isABot;
  }
};
