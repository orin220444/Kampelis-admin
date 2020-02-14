const {Group} = require('../database');
const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');
const bot = require('../bot_init');
const i18n = require('../i18n');
bot.use(i18n.middleware());
module.exports = async (ctx) => {
  const answer = `Выберите язык:
  Choose the language:`;
  const keyboard = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('🇷🇺', 'ru'),
    Markup.callbackButton('🇺🇸', 'en'),
  ]));
  ctx.reply(answer, keyboard);
  bot.action(/.+/, async (ctx) => {
    ctx.reply(`Oh, ${ctx.match[0]}! Great choice`);
    const setLocale = ctx.match[0];
    i18n.resetLocale(setLocale);
    const group = await Group.findOne({group_id: ctx.chat.id});
    group.language = await setLocale;
    await group.save();
  });
};
