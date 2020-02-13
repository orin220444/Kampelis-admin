module.exports = (ctx) => {
  const chat = ctx.telegram.getChat(ctx.chat.id);
  console.log(chat);
};
