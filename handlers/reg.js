import { User, Group } from '../database.js';

export default async (ctx) => {
  const user = await User.findOne({id: ctx.from.id});
  const group = await Group.findOne({group_id: ctx.chat.id});

  if (!user) {
    try {
      const user = await User.create({
        username: ctx.from.username,
        id: ctx.from.id,
        firstname: ctx.from.first_name,
      });
      user.save();
      const answer = ctx.i18n.t('user.added');
      ctx.reply(answer,
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
      const answer = ctx.i18n.t('user.exists');
      ctx.reply(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    } catch (error) {
      const answer = ctx.i18n.t('error', {error: error});
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    }
  }
  if (!group) {
    try {
      const group = await Group.create({
        group_id: ctx.chat.id,
        title: ctx.chat.title,

      });
      await group.save();
      const answer = ctx.i18n.t('group.added');
      ctx.reply(answer, {reply_to_message_id: ctx.message.message_id});
    } catch (error) {
      const answer = ctx.i18n.t('error', {error: error});
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    }
  } else {
    try {
      const answer = ctx.i18n.t('group.exists');
      ctx.reply(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    } catch (error) {
      const answer = ctx.i18n.t('error', {error: error});
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    }
  }
};
