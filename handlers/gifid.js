module.exports = (ctx) => {
  console.log(ctx.message.reply_to_message.animation.file_id);
};
