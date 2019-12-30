/* eslint-disable max-len */
const Telegraf = require('telegraf');
const I18n = require('telegraf-i18n');
const path = require('path');
require('dotenv').config({path: './.env'});
const bot = new Telegraf(process.env.BOT_TOKEN);
const i18n = new I18n({
  directory: path.resolve(__dirname, 'locales'),
  defaultLanguage: 'ru',
  defaultLanguageOnMissing: true,
});
bot.use(Telegraf.session());
bot.use(i18n.middleware());

bot.on('new_chat_members', (ctx) => {
  answer = ctx.i18n.t('newChatMembers');
  ctx.reply(answer);
});
bot.help((ctx) => {
  ctx.reply.i18n.t('help');
});
bot.command('test', (ctx) => {
  answer = ctx.i18n.t('test');
  ctx.reply(answer);
});
bot.command('ban', (async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id);
  const banUser = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.reply_to_message.from.id);
  const ischatMemberAnAdmin = await chatMember.status === 'creator' || 'administrator';
  const isbanUserAnAdmin = await banUser.status === 'creator' || 'administrator';

  if (isbanUserAnAdmin == true) {
    ctx.reply.i18n.t('banUserIsAnAdmin');
  }
  if (ischatMemberAnAdmin == false) {
    ctx.reply.i18n.t('chatMemberIsNotAnAdmin');
  } else {
    await ctx.telegram.restrictChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id, {
      can_send_messages: false,
      can_send_other_messages: false,
      can_send_media_messages: false,
      can_add_web_page_previews: false,
    });
    await ctx.reply.i18n.t('userBanned');
  }
}
));
bot.command('unban', (async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id);
  const unBanUser = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.reply_to_message.from.id);
  const ischatMemberAnAdmin = await chatMember.status === 'creator' || 'administrator';
  const isunbanUserAnAdmin = await unBanUser.status === 'creator' || 'administrator';


  if (isunbanUserAnAdmin == true) {
    ctx.reply.i18n.t('unbanUserIsAnAdmin');
  }
  if (ischatMemberAnAdmin == false) {
    ctx.reply.i18n.t('chatMemberIsNotAnAdmin');
  } else {
    await ctx.telegram.restrictChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id, {
      can_send_messages: true,
      can_send_other_messages: true,
      can_send_media_messages: true,
      can_add_web_page_previews: true,
    });
    await ctx.reply.i18n.t('userUnbanned');
  }
}
));
bot.command('kick', (async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id);
  const kickUser = await ctx.telegram.getChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id);
  const ischatMemberAnAdmin = await chatMember.status === 'creator' || 'administrator';
  const iskickUserAnAdmin = await kickUser.status === 'creator' || 'administrator';


  if (iskickUserAnAdmin == true) {
    ctx.reply.i18n.t('kickUserIsAnAdmin');
  }
  if (ischatMemberAnAdmin == false) {
    ctx.reply.i18n.t('chatMemberIsNotAnAdmin');
  } else {
    await ctx.telegram.kickChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id);
    await ctx.reply.i18n.t('userKicked');
  }
}
));


bot.catch((error, ctx) => {
  console.log('Oops', error);
  ctx.telegram.sendMessage(364841884, error);
});
bot.launch().then(() => {
  console.log(`bot started`);
});
