const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
require('dotenv').config({ path: './.env'})
const path = require('path')




bot.launch()