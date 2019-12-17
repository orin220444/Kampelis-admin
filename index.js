/* eslint-disable max-len */
const Telegraf = require('telegraf' );
require('dotenv').config({path: './.env'});
const bot = new Telegraf(process.env.BOT_TOKEN);

const reply = require('./locales/ru.json');
bot.on('new_chat_members', (ctx) => {
  console.log(ctx.message);
  // const answer = newChatMembers;
  ctx.reply(reply.newChatMembers);
});

bot.command('ban', (async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id);
  const banUser = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.reply_to_message.from.id);
  const ischatMemberAnAdmin = await chatMember.status === 'creator' || 'administrator';
  const isbanUserAnAdmin = await banUser.status === 'creator' || 'administrator';
  if (isbanUserAnAdmin == true) {
    ctx.reply(reply.banUserIsAnAdmin);
  } if (ischatMemberAnAdmin == false) {
    ctx.reply(reply.chatMemberIsNotAnAdmin);
  } else {
    // await ctx.telegram.restrictChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id);
    await ctx.reply('banned!');
  }
}));
bot.command('unban', (async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id);
  const unBanUser = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.reply_to_message.from.id);
  const ischatMemberAnAdmin = await chatMember.status === 'creator' || 'administrator';
  const isbanUserAnAdmin = await unBanUser.status === 'creator' || 'administrator';
  if (isbanUserAnAdmin == true) {
    ctx.reply(reply.banUserIsAnAdmin);
  }
  if (ischatMemberAnAdmin == false) {
    ctx.reply(reply.chatMemberIsNotAnAdmin);
  } else {
    await ctx.telegram.restrictChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id, {
      can_send_messages: true,
      can_send_other_messages: true,
      can_send_media_messages: true,
      can_add_web_page_previews: true,
    });
    await ctx.reply('unbanned!');
  }
}));
bot.command('kick', (async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id);
  const kickUser = await ctx.telegram.getChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id);
  const ischatMemberAnAdmin = await chatMember.status === 'creator' || 'administrator';
  const iskickUserAnAdmin = await kickUser.status === 'creator' || 'administrator';
  if (iskickUserAnAdmin == true) {
    ctx.reply('кхмм, кикнуть администратора? интересно...');
  } if (ischatMemberAnAdmin == false) {
    ctx.reply('вы не администратор!');
  } else {
    await ctx.telegram.kickChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id);
    await ctx.reply('kicked!');
  }
}));
bot.command('help', (ctx) => {
  ctx.reply(reply.help);
});

bot.catch((error) => {
  console.log('Oops', error);
});
bot.launch().then(() => {
  console.log(`bot started`);
});
