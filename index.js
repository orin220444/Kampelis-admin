/* eslint-disable max-len */
const Telegraf = require('telegraf');
require('dotenv').config({path: './.env'});
const bot = new Telegraf(process.env.BOT_TOKEN);

const reply = require('./locales/ru.json');
bot.on('new_chat_members', (ctx) => {
  ctx.reply(reply.newChatMembers);
});
bot.help((ctx) => {
  ctx.reply(reply.help);
});

bot.command('ban', (async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id);
  const banUser = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.reply_to_message.from.id);
  const ischatMemberAnAdmin = await chatMember.status !== 'creator' || 'administrator';
  const isbanUserAnAdmin = await banUser.status == 'creator' || 'administrator';
  switch (true) {
    case isbanUserAnAdmin:
      ctx.reply(reply.banUserIsAnAdmin);
      break;
    case ischatMemberAnAdmin:
      ctx.reply(reply.chatMemberIsNotAnAdmin);
      break;
    default:
      await ctx.telegram.restrictChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id, {
        can_send_messages: false,
        can_send_other_messages: false,
        can_send_media_messages: false,
        can_add_web_page_previews: false,
      });
      await ctx.reply(reply.userBanned);
      break;
  }
}
));
bot.command('unban', (async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id);
  const unBanUser = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.reply_to_message.from.id);
  const ischatMemberAnAdmin = await chatMember.status !== 'creator' || 'administrator';
  const isbanUserAnAdmin = await unBanUser.status === 'creator' || 'administrator';
  switch (true) {
    case isbanUserAnAdmin:
      ctx.reply(reply.banUserIsAnAdmin);
      break;
    case ischatMemberAnAdmin:
      ctx.reply(reply.chatMemberIsNotAnAdmin);
      break;
    default:
      await ctx.telegram.restrictChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id, {
        can_send_messages: true,
        can_send_other_messages: true,
        can_send_media_messages: true,
        can_add_web_page_previews: true,
      });
      await ctx.reply(reply.userUnbanned);
  }
}));
bot.command('kick', (async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id);
  const kickUser = await ctx.telegram.getChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id);
  const ischatMemberAnAdmin = await chatMember.status !== 'creator' || 'administrator';
  const iskickUserAnAdmin = await kickUser.status === 'creator' || 'administrator';
  switch (true) {
    case iskickUserAnAdmin:
      ctx.reply(reply.kickUserIsAnAdmin);
      break;
    case ischatMemberAnAdmin:
      ctx.reply(reply.chatMemberIsNotAnAdmin);
      break;
    default:
      await ctx.telegram.kickChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id);
      await ctx.reply(reply.userKicked);
  }
}));


bot.catch((error) => {
  console.log('Oops', error);
});
bot.launch().then(() => {
  console.log(`bot started`);
});
