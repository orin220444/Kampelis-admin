/* eslint-disable max-len */
const Telegraf = require('telegraf' );
require('dotenv').config({path: './.env'});
const bot = new Telegraf(process.env.BOT_TOKEN);


bot.on('new_chat_members', (ctx) => {
  console.log(ctx.message);
  const answer = `Приветствую тебя, ${ctx.message.from.first_name} в чате: ${ctx.chat.title}`;
  ctx.reply(answer);
});

bot.command('ban', (async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id);
  const banUser = await ctx.telegram.getChatMember(ctx.message.reply_to_message.from.id);
  const ischatMemberAnAdmin = await chatMember === 'creator' || 'administrator';
  const isbanUserAnAdmin = await banUser === 'creator' || 'administrator';
  if (isbanUserAnAdmin == true) {
    ctx.reply('администратора невозможно заблокировать!');
  } if (ischatMemberAnAdmin == false) {
    ctx.reply('вы не администратор!');
  } else {
    await ctx.telegram.restrictChatMember(ctx.chat.id, banUser);
  }
}));
bot.command('unban', (async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id);
  const unBanUser = await ctx.telegram.getChatMember(ctx.message.reply_to_message.from.id);
  const ischatMemberAnAdmin = await chatMember === 'creator' || 'administrator';
  const isbanUserAnAdmin = await unBanUser === 'creator' || 'administrator';
  if (isbanUserAnAdmin == true) {
    ctx.reply('кхмм, разблокировать администратора? интересно...');
  } if (ischatMemberAnAdmin == false) {
    ctx.reply('вы не администратор!');
  } else {
    await ctx.telegram.restrictChatMember(ctx.chat.id, unBanUser, {
      can_send_messages: true,
      can_send_other_messages: true,
      can_send_media_messages: true,
      can_add_web_page_previews: true,
    });
  }
}));
bot.command('kick', (async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id);
  const kickUser = await ctx.telegram.getChatMember(ctx.message.reply_to_message.from.id);
  const ischatMemberAnAdmin = await chatMember === 'creator' || 'administrator';
  const iskickUserAnAdmin = await unBanUser === 'creator' || 'administrator';
  if (iskickUserAnAdmin == true) {
    ctx.reply('кхмм, кикнуть администратора? интересно...');
  } if (ischatMemberAnAdmin == false) {
    ctx.reply('вы не администратор!');
  } else {
    await ctx.telegram.kickChatMember(ctx.chat.id, kickUser)
  }
}));


bot.catch((error) => {
  console.log('Oops', error);
});
bot.launch().then(() => {
  console.log(`bot started`);
});
