require('dotenv').config({path: './.env'});
const bot = require('./bot');
const i18n = require('./i18n');
const {
  handleWelcome,
  handleBan,
  handleUnban,
  handleHelp,
  handleF,
  handleTest,
  handleKick,
  handleReg,
  handleShrug,
  handleSetRules,
  handleRules,
  handleDurka,
  handleID,
  handleUser,
  handleAdmin,
  handleLanguage,
  handleGetLink,
  handleNoHello,
  handleDelete,
} = require('../handlers');
bot.use(i18n.middleware());
/*
TODO: settings
TODO: scripts add to db
*/
bot.mention('admin', handleAdmin);
bot.on('new_chat_members', handleWelcome);
bot.command('help', handleHelp);
bot.command('test', handleTest);
bot.command('f', handleF);
bot.command('ban', handleBan);
bot.command('unban', handleUnban);
bot.command('kick', handleKick);
bot.command('reg', handleReg);
bot.command('shrug', handleShrug);
bot.command('rules', handleRules);
bot.command('setrules', handleSetRules);
bot.command('durka', handleDurka);
bot.command('id', handleID);
bot.command('user', handleUser);
bot.command('language', handleLanguage);
bot.command('getlink', handleGetLink);
bot.command('neprivet', handleNoHello);
bot.command('delete', handleDelete);
bot.launch().then(() => {
  console.log(`bot started`);
});
