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
const gifs = require('./config/gifs.json');
bot.use(i18n.middleware());
/*
  TODO: check changing username
  TODO: pidor of the day
*/
bot.on('new_chat_members', (ctx) => {
  const answer = ctx.i18n.t('newChatMembers', {
    user: ctx.from.first_name,
    chat: ctx.chat.title,
    user_id: ctx.from.id,
  });
  ctx.replyWithMarkdown(answer);
});
bot.help((ctx) => {
  const answer = ctx.i18n.t('help');
  ctx.reply(answer);
});
bot.command('test', (ctx) => {
  const answer = ctx.i18n.t('test', {
    user: ctx.from.first_name,
    chat: ctx.chat.title,
    user_id: ctx.from.id,
  });
  ctx.replyWithMarkdown(answer);
});
bot.hears('gifid', (ctx) => {
  console.log(ctx.message.reply_to_message.animation.file_id);
});
bot.command('f', (ctx) => {
  const gif = gifs.f;
  const randomGif = gif[Math.floor(Math.random() * gif.length)];
  ctx.replyWithDocument(randomGif);
});
Telegraf.hears('/shrug', (ctx) => {
  const answer = ctx.i18n.t('shrug');
  ctx.reply(answer);
});
bot.command('ban', (async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id);
  const banUser = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.reply_to_message.from.id);
  const ischatMemberAnAdmin = await chatMember.status === 'creator' || 'administrator';
  const isbanUserAnAdmin = await banUser.status === 'creator' || 'administrator';

  if (isbanUserAnAdmin == true) {
    const answer = ctx.i18n.t('banUserIsAnAdmin');
    ctx.reply(answer);
  }
  if (ischatMemberAnAdmin == false) {
    const answer = ctx.i18n.t('chatMemberIsNotAnAdmin');
    ctx.reply(answer);
  } else {
    await ctx.telegram.restrictChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id, {
      can_send_messages: false,
      can_send_other_messages: false,
      can_send_media_messages: false,
      can_add_web_page_previews: false,
    });
    const answer = await ctx.i18n.t('userBanned', {
      user: ctx.message.reply_to_message.from.first_name,
      user_id: ctx.message.reply_to_message.from.id,
    });
    await ctx.replyWithMarkdown(answer);
  }
}
));
bot.command('unban', (async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id);
  const unBanUser = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.reply_to_message.from.id);
  const ischatMemberAnAdmin = await chatMember.status === 'creator' || 'administrator';
  const isunbanUserAnAdmin = await unBanUser.status === 'creator' || 'administrator';


  if (isunbanUserAnAdmin == true) {
    const answer = ctx.i18n.t('unbanUserIsAnAdmin');
    ctx.reply(answer);
  }
  if (ischatMemberAnAdmin == false) {
    const answer = ctx.i18n.t('chatMemberIsNotAnAdmin');
    ctx.reply(answer);
  } else {
    await ctx.telegram.restrictChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id, {
      can_send_messages: true,
      can_send_other_messages: true,
      can_send_media_messages: true,
      can_add_web_page_previews: true,
    });
    const answer = await ctx.i18n.t('userUnBanned', {
      user: ctx.message.reply_to_message.from.first_name,
      user_id: ctx.message.reply_to_message.from.id,
    });
    await ctx.replyWithMarkdown(answer);
  }
}
));
bot.command('kick', (async (ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id);
  const kickUser = await ctx.telegram.getChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id);
  const ischatMemberAnAdmin = await chatMember.status === 'creator' || 'administrator';
  const iskickUserAnAdmin = await kickUser.status === 'creator' || 'administrator';


  if (iskickUserAnAdmin == true) {
    const answer = ctx.i18n.t('kickUserIsAnAdmin');
    ctx.reply(answer);
  }
  if (ischatMemberAnAdmin == false) {
    const answer = ctx.i18n.t('chatMemberIsNotAnAdmin');
    ctx.reply(answer);
  } else {
    await ctx.telegram.kickChatMember(ctx.chat.id, ctx.message.reply_to_message.from.id);
    const answer = await ctx.i18n.t('userKicked', {
      user: ctx.message.reply_to_message.from.first_name,
      user_id: ctx.message.reply_to_message.from.id,
    });
    await ctx.replyWithMarkdown(answer);
  }
}
));

bot.catch((error, ctx) => {
  console.log('Oops', error);
  ctx.telegram.sendMessage(process.env.CREATOR_ID, error);
});

bot.launch().then(() => {
  console.log(`bot started`);
});
