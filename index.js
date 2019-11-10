const Telegraf = require('telegraf');
require('dotenv').config({ path: './.env'})
const bot = new Telegraf(process.env.BOT_TOKEN)

const path = require('path')
const welcomemessage = `Приветствую тебя, ${ctx.from.admin} в чате: ${ctx.from.chat}`
bot.on('new_chat_members', welcomemessage)
      

bot.catch((error) => {
    console.log('Oops', error)
  })
bot.launch().then(() => {
console.log(`bot started`)
})
