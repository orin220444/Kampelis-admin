import {User, Group} from '../database.js';
export const handleWelcome = async (ctx) => {
  const newbie = ctx.message.new_chat_member;
  const group = ctx.chat;
  checkUser(newbie, ctx);
  try {
    await addUserToDb(newbie.id);
    await addGroupToDb(group);

    const answer = ctx.i18n.t('welcome.suc', {
      user: newbie.first_name,
      chat: ctx.chat.title,
      user_id: newbie.id,
    });
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id});
  } catch (error) {
    const answer = ctx.i18n.t('error', {error: error});
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id},
    );
  }
};
// functions

/**
     * searches group in the database and adds to the database if it not exists
     * @param {number} chat - Telegram group
     * @return {object} group data from the database
     */
async function addGroupToDb(chat) {
  const group = await Group.findOne({group_id: chat.id});
  if (!group) {
    try {
      const group = await Group.create({
        group_id: chat.id,
        title: chat.title,

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


/**
   * checks for the is_bot field of the user
   * @param {object} user - telegram user object
   * @param {object} ctx - telegraf context
   */
function checkUser(user, ctx) {
  if (user.is_bot) {
    const answer = ctx.i18n.t('welcome.ChatMemberIsBot');
    ctx.reply(answer,
        {reply_to_message_id: ctx.message.message_id});
  }
}
// TOD0: add captcha
// TODO: ban bot and userBots
