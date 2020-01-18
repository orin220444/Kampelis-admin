const {User} = require('../database');
module.exports = async (ctx) => {
  try {
    const users = await User.find();
    console.log(users.username);
    const pidor = users.username[Math.floor(Math.random() * users.length)];
    const answer = ctx.i18n.t('pidor.found', {
      pidor: pidor,
    });
    ctx.replyWithMarkdown(answer);
  } catch (error) {
    const answer = ctx.i18n.t('error', {error: error});
    ctx.replyWithMarkdown(answer,
        {reply_to_message: ctx.message.id},
    );
  }
};
// FIXME:pidor
