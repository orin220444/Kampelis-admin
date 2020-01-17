module.exports = (ctx) => {
  try {
    console.log(ctx.message.reply_to_message.animation.file_id);
  } catch (error) {
    console.log(error);
  }
};
