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
  // handleChecker,
  handleSetRules,
  handleRules,
  // handlePidor,
  handleDurka,
  handleStickerID,
} = require('./handlers');
bot.use(i18n.middleware());
/*
TODO: create file or send rules and gifs to mongo
TODO: @admin
*/
bot.on('new_chat_members', handleWelcome);
// bot.on('message', handleChecker);
bot.command('help', handleHelp);
bot.command('test', handleTest);
bot.command('gifid', handleGifID);
bot.command('f', handleF);
bot.command('ban', handleBan);
bot.command('unban', handleUnban);
bot.command('kick', handleKick);
bot.command('reg', handleReg);
bot.command('shrug', handleShrug);
bot.command('rules', handleRules);
bot.command('setrules', handleSetRules);
bot.command('stickerid', handleStickerID);
bot.command('durka', handleDurka);

// bot.command('pidor', handlePidor);
bot.launch().then(() => {
  console.log(`bot started`);
});
