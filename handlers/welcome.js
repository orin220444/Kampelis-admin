import { User, Group } from '../database.js';

export default async (ctx) => {
  if (ctx.message.new_chat_member.is_bot) {
    const answer = ctx.i18n.t('welcome.ChatMemberisbot');
    ctx.reply(answer,
        {reply_to_message_id: ctx.message.message_id});
  } else {
    const user = await User.findOne({id: ctx.message.new_chat_member.id});
    const group = await Group.findOne({group_id: ctx.chat.id});

    if (!user) {
      try {
        const user = await User.create({
          username: ctx.message.new_chat_member.username,
          id: ctx.message.new_chat_member.id,
          firstname: ctx.message.new_chat_member.first_name,
        });
        await user.save();
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
      } catch (error) {
        const answer = ctx.i18n.t('error', {error: error});
        ctx.replyWithMarkdown(answer,
            {reply_to_message_id: ctx.message.message_id},
        );
      }
    }
    try {
      const answer = ctx.i18n.t('welcome.suc', {
        user: ctx.message.new_chat_member.first_name,
        chat: ctx.chat.title,
        user_id: ctx.message.new_chat_member.id,
      });
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id});
    } catch (error) {
      const answer = ctx.i18n.t('error', {error: error});
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id},
      );
    }
  };
};
// TOD0: add captcha
