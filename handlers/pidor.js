module.exports = async(ctx) => {
const users = await User.find({username: *}, callback);
const pidor = users[Math.floor(Math.random() * users.length)];
const answer = ctx.i18n.t('pidor.found', {
pidor: pidor,
})
ctx.replyWithMarkdown(answer)
}
