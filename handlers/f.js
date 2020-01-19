const {Group} = require('../database');
module.exports = async (ctx) => {
  const group = await Group.findOne({group_id: ctx.chat.id});
  if (!group) {
    try {
      const answer = ctx.i18n.t('group.notfound');
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    } catch (error) {
      const answer = ctx.i18n.t('error', {error: error});
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    }
  } else {
    try {
      const gif = await group.gifs;
      console.log(gif);
      console.log(gif.length);
      const randomGif = gif[Math.floor(Math.random() * gif.length)];
      console.log(randomGif);
      ctx.replyWithDocument(randomGif,
          {reply_to_message_id: ctx.message.message_id},
      );
    } catch (error) {
      const answer = ctx.i18n.t('error', {error: error});
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    };
  };
};
