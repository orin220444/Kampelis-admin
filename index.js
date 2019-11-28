const Telegraf = require('telegraf');
require('dotenv').config({ path: './.env'})
const bot = new Telegraf(process.env.BOT_TOKEN)

const path = require('path')
bot.on('new_chat_members', (ctx) => {
  console.log(ctx.message)
ctx.reply(`Приветствую тебя, ${ctx.message.from.first_name} в чате: ${ctx.chat.title}`)
} ) 
  
  bot.command('ban', (async(ctx) =>  {
    const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id)
    if (chatMember && ['creator', 'administrator'].includes(chatMember.status)) {
      const banuser = await ctx.message.reply_to_message.from.id
    }if(banuser == 'creator' || 'adminstator'){
      ctx.reply('Забанить администратора невозможно!')
    }if (chatMember == 'creator' || 'administrator'){
    ctx.reply(`Эта команда доступна только администраторам!`)
  }else{

  await ctx.telegram.restrictChatMember(ctx.chat.id, banuser)
  ctx.reply(ctx.chat.id, `Пользователь ${ctx.reply.from.id} забанен!`)
}

    
}))
      
bot.command('unban', (async(ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id)
    if (chatMember && ['creator', 'administrator'].includes(chatMember.status)) {
    
      const unbanuser = await ctx.message.reply_to_message.from.id
     
  await ctx.telegram.restrictChatMember(ctx.chat.id, unbanuser, {
                                              
        can_send_messages: true,
        can_send_other_messages: true,
        can_send_media_messages: true,
        can_add_web_page_previews: true,
        })
ctx.reply(ctx.chat.id, `Пользователь ${ctx.reply.from.id} разбанен!`)
}else{
  ctx.reply(ctx.from.id, `Вы не администратор!`)
}
}))
  bot.command('kick', (async(ctx) => {
  const chatMember = await ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id)
  const kickuser = await ctx.message.reply_to_message.from.id  
  if (chatMember && ['creator', 'administrator'].includes(chatMember.status)) {
    console.log(ctx.message.reply_to_message.from)
  }
     
      if(kickuser == 'creator' || 'adminstator'){
        ctx.reply('Забанить администратора невозможно!')
      }if (chatMember == 'creator' || 'administrator'){
      ctx.reply(`Эта команда доступна только администраторам!`)
  
}else{
  await ctx.telegram.kickChatMember(ctx.chat.id, kickuser)
ctx.reply(ctx.from.id, `Пользователь ${ctx.reply.from.id} кикнут!`)

}
  }))
   
  
    
bot.catch((error) => {
    console.log('Oops', error)
  })
bot.launch().then(() => {
console.log(`bot started`)
})
