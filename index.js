const Telegraf = require('telegraf');
require('dotenv').config({ path: './.env'})
const bot = new Telegraf(process.env.BOT_TOKEN)

const path = require('path')
bot.on('new_chat_members', (ctx => (`Приветствую тебя, ${ctx.from.admin} в чате: ${ctx.from.chat}`)))
  
  
  bot.command('ban', (async(ctx) =>  {
    const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id)
    if (chatMember && ['creator', 'administrator'].includes(chatMember.status)) {
await telegram.restrictChatMember(ctx.from.chat.id,ctx.message.reply_to_message.from)
ctx.reply(ctx.from.id, `Пользователь ${ctx.reply.from.id} забанен!`)
    }else{
      ctx.reply(`Эта команда доступна только администраторам!`)
    }
}))
bot.catch((error) => {
    console.log('Oops', error)
  })
bot.launch().then(() => {
console.log(`bot started`)
})
