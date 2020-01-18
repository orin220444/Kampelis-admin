const {User} = require('../database');
module.exports = async (ctx) => {
  const users = await User.find();
  console.log(users.username);
  const pidor = users.username[Math.floor(Math.random() * users.length)];
  const answer = ctx.i18n.t('pidor.found', {
    pidor: pidor,
  });
  ctx.replyWithMarkdown(answer);
};
// FIXME:pidor
