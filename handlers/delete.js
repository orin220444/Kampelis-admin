module.exports = async (ctx) => {
  if (ctx.message.reply_to_message) {
    await ctx.telegram.deleteMessage(ctx.chat.id,
        ctx.message.reply_to_message.message_id,
    );
    await ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
  } else {
    ctx.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
  }
};
