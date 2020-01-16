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
const {
  handleWelcome,
  handleBan,
  handleUnban,
  handleHelp,
  handleF,
  handleTest,
  handleGifID,
  handleKick,
  handleReg,
  handleShrug,
} = require('./handlers');
bot.use(i18n.middleware());

bot.on('new_chat_members', handleWelcome);
bot.command('help', handleHelp);
bot.command('test', handleTest);
bot.hears('gifid', handleGifID);
bot.command('f', handleF);
bot.command('ban', handleBan);
bot.command('unban', handleUnban);
bot.command('kick', handleKick);
bot.command('reg', handleReg);
bot.command('shrug', handleShrug);
bot.catch((error, ctx) => {
  console.log('Oops', error);
  ctx.telegram.sendMessage(process.env.CREATOR_ID, error);
});

bot.launch().then(() => {
  console.log(`bot started`);
});
