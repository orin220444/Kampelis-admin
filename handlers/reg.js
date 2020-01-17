const {User} = require('../database.js');
module.exports = async (ctx) => {
  const user = await User.findOne({id: ctx.from.id});

  if (!user) {
    try {
      const user = await User.create({
        username: ctx.from.username,
        id: ctx.from.id,
        firstname: ctx.from.first_name,

      });
      user.save();
      const answer = ctx.i18n.t('user.added');
      ctx.reply(answer);
    } catch (error) {
      console.log(error);
    }
  };
  try {
    const answer = ctx.i18n.t('user.exists');
    ctx.reply(answer);
  } catch (error) {
    console.log(error);
  }
};
