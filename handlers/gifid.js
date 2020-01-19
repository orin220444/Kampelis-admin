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
  } if (!ctx.message.reply_to_message) {
    try {
      const answer = ctx.i18n.t('nogif');
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
      console.log(ctx.message.reply_to_message.animation.file_id);
      console.log(group.gifs);
      group.gifs = await `${ctx.message.reply_to_message.animation.file_id}`;
      console.log(group.gifs);
      await group.save();
      console.log(group.gifs);
      const answer = ctx.i18n.t('setrule.suc');
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    } catch (error) {
      const answer = ctx.i18n.t('error', {error: error});
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    }
  };
};
