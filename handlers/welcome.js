const {User, Group} = require('../database');
module.exports = async (ctx) => {
  if (ctx.message.new_chat_member.is_bot) {
    const answer = ctx.i18n.t('welcome.ChatMemberisbot');
    ctx.reply(answer,
        {reply_to_message_id: ctx.message.message_id});
  } else {
    await addUserToDb(ctx.message.new_chat_member.id);
    await addGroupToDb(ctx.chat.id);

    try {
      const answer = ctx.i18n.t('welcome.suc', {
        user: ctx.message.new_chat_member.first_name,
        chat: ctx.chat.title,
        user_id: ctx.message.new_chat_member.id,
      });
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id});
    } catch (error) {
      sendError(error);
    }
  };
  // functions


  /**
   * sends error
   * @param {error} message - error
   */
  function sendError(message) {
    const answer = ctx.i18n.t('error', {error: message});
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id},
    );
  }


  /**
     * searches group in the database and adds to the database if it not exists
     * @param {number} groupID - Telegram group id
     * @return {object} groupdata from the database
     */
  async function addGroupToDb(groupID) {
    const group = await Group.findOne({group_id: groupID});
    if (!group) {
      try {
        const group = await Group.create({
          group_id: ctx.chat.id,
          title: ctx.chat.title,

        });
        await group.save();
      } catch (error) {
        const answer = ctx.i18n.t('error', {error: error});
        ctx.replyWithMarkdown(answer,
            {reply_to_message_id: ctx.message.message_id},
        );
      }
    }
  }

  /**
      * Searches user in the database and adds to database if he is not exists
      * @param {number} userID - telegram user id
      * @return {object} user info from the database
      */
  async function addUserToDb(userID) {
    const user = await User.findOne({id: userID});
    if (!user) {
      try {
        const user = await User.create({
          username: ctx.message.new_chat_member.username,
          id: ctx.message.new_chat_member.id,
          firstname: ctx.message.new_chat_member.first_name,
        });
        await user.save();
      } catch (error) {
        const answer = ctx.i18n.t('error', {error: error});
        ctx.replyWithMarkdown(answer,
            {reply_to_message_id: ctx.message.message_id},
        );
      }
    }
  }
};
// TOD0: add captcha
