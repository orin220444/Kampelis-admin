require('dotenv').config({path: './.env'});
const bot = require('./bot');
const i18n = require('./i18n');
const Stage = require('telegraf');
const session = require('telegraf');
const {
  handleWelcome,
  handleBan,
  handleUnBan,
  handleHelp,
  handleF,
  handleTest,
  handleKick,
  handleReg,
  handleShrug,
  handleSetRules,
  handleRules,
  handleFun,
  handleID,
  handleUser,
  handleAdmin,
  handleLanguage,
  handleGetLink,
  handleNoHello,
  // handleStickerID,
  handleBomb,
  handleDice,
  handleDarts,
  handleWeather,
} = require('../handlers');
bot.use(i18n.middleware());
/*
TODO: settings
TODO: scripts add to db
*/
const stage = new Stage([handleWeather]);
bot.use(stage.middleware());
bot.use(session());
bot.mention('admin', handleAdmin);
bot.on('new_chat_members', handleWelcome);
bot.command('help', handleHelp);
bot.command('test', handleTest);
bot.command('f', handleF);
bot.command('ban', handleBan);
bot.command('unban', handleUnBan);
bot.command('kick', handleKick);
bot.command('reg', handleReg);
bot.command('shrug', handleShrug);
bot.command('rules', handleRules);
bot.command('setRules', handleSetRules);
bot.command('durka', handleFun);
bot.command('id', handleID);
bot.command('user', handleUser);
bot.command('language', handleLanguage);
bot.command('getlink', handleGetLink);
bot.command('neprivet', handleNoHello);
// bot.command('id', handleStickerID);
// bot.command('durka', handleDurka);
bot.command('bomb', handleBomb);
bot.command('dice', handleDice);
bot.command('darts', handleDarts);
bot.command('weather', (ctx) => ctx.scene.start('WeatherScene'));
bot.launch().then(() => {
  console.log(`bot started`);
});
