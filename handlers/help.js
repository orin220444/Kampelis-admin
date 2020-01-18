module.exports = (ctx) => {
  try {
    const answer = ctx.i18n.t('help');
    ctx.reply(answer,
        {reply_to_message_id: ctx.message.message_id},
    );
  } catch (error) {
    console.log(error);
  }
};
