const {User} = require('../database.js');
module.exports = async (ctx) => {
  const chat = ctx.chat.id;
  const user = await User.findOne({id: ctx.from.id});
  if (!user) {
    try {
      const user = await User.create({
        username: ctx.from.username,
        id: ctx.from.id,
        firstname: ctx.from.first_name,

      });
      user.save();
    } catch (error) {
      console.log(error);
    }
  }
  if (user.username !== ctx.from.username) {
    try {
      const answer = ctx.i18n.t('user.update.username', {
        user_id: user.id,
        lastusername: user.username,
        newusername: ctx.from.username,
      });
      await ctx.telegram.sendMessage(chat, answer,
          {parse_mode: 'MarkdownV2'},
      );
      user.username = await ctx.from.username;
      await user.save();
    } catch (error) {
      console.log(error);
    }
  }
  if (user.firstname !== ctx.from.first_name) {
    try {
      const answer = ctx.i18n.t('user.update.firstname', {
        user_id: user.id,
        lastfirstname: user.firstname,
        newfirstname: ctx.from.first_name,
      });
      await ctx.telegram.sendMessage(chat, answer,
          {parse_mode: 'MarkdownV2'},
      );
      user.firstrname = await ctx.from.first_name;
      await user.save();
    } catch (error) {
      console.log(error);
    }
  }
  if (user.username !== ctx.from.username &
   user.firstname !== ctx.from.first_name) {
    try {
      const answer = ctx.i18n.t('user.update.bothnames', {
        user_id: user.id,
        lastusername: user.username,
        lastfirstname: user.firstname,
        newusername: ctx.from.username,
        newfirstname: ctx.from.first_name,
      });
      ctx.telegram.sendMessage(chat, answer,
          {parse_mode: 'MarkdownV2'},
      );
      user.username = await ctx.from.username;
      user.firstname = await ctx.from.first_name;
      await user.save();
    } catch (error) {
      console.log(error);
    }
  }
};
// FIXME
