const {User} = require('../database.js');
module.exports = async (ctx) => {
  const user = await User.findOne({id: ctx.from.id});

  if (!user) {
    const user = await User.create({
      username: ctx.from.username,
      id: ctx.from.id,
      firstname: ctx.from.first_name,

    });
    user.save();
    const answer = ctx.i18n.t('user.added');
    ctx.reply(answer);
  };
  const answer = ctx.i18n.t('user.exists');
  ctx.reply(answer);
};
