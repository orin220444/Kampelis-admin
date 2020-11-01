// const {Group} = require('../database');
import Markup from 'telegraf/markup';
import Extra from 'telegraf/extra';
import {bot} from '../bot/bot.js';
import {i18n} from '../bot/i18n';
bot.use(i18n.middleware());
export const handleLanguage = (ctx) => {
  try {
    const answer = `Выберите язык:
Choose the language:`;
    const keyboard = Extra.markup(Markup.inlineKeyboard([
      Markup.callbackButton('🇷🇺', 'ru'),
      Markup.callbackButton('🇺🇸', 'en'),
    ]));
    ctx.reply(answer, keyboard);
  } catch (error) {
    const answer = ctx.i18n.t('error', {error: error});
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id});
  }
  bot.action(/.+/, ({reply, match, i18n}) => {
    try {
      reply(`Oh, ${match[0]}! Great choice`);
      const setLocale = match[0];
      i18n.locale(setLocale);
      // const group = await Group.findOne({group_id: ctx.chat.id});
      // group.language = await setLocale;
      // await group.save();
    } catch (error) {
      const answer = ctx.i18n.t('error', {error: error});
      ctx.replyWithMarkdown(answer,
          {reply_to_message_id: ctx.message.message_id});
    }
  });
};
// TODO: move answers to locales
