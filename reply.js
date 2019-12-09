const newChatMembers = `Приветствую тебя, ${ctx.message.from.first_name} в чате: ${ctx.chat.title}`
const banUserIsAnAdmin = `Забанить администратора невозможно!`
const chatMemberIsNotAnAdmin = `Эта команда доступна только администраторам!`
const userBanned = `Пользователь ${ctx.reply.from.id} забанен!`
const userUnBanned = `Пользователь ${ctx.reply.from.id} разбанен!`
const userKicked = `Пользователь ${ctx.reply.from.id} кикнут!`