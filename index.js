const Telegraf = require('telegraf');
require('dotenv').config({ path: './.env'})
const bot = new Telegraf(process.env.BOT_TOKEN)

const path = require('path')



bot.catch((error) => {
    console.log('Oops', error)
  })
bot.launch().then(() => {
console.log(`bot started`)
})
