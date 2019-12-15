/* eslint-disable max-len */
const newChatMembers = `Приветствую тебя, ${ctx.message.from.first_name} в чате: ${ctx.chat.title}`;
const banUserIsAnAdmin = `Кхмм, заблокировать администратора? интересно...`;
const chatMemberIsNotAnAdmin = 'Вы не администратор!';
const userBanned = `Пользователь ${ctx.reply.from.id} забанен!`;
const userUnBanned = `Пользователь ${ctx.reply.from.id} разбанен!`;
const userKicked = `Пользователь ${ctx.reply.from.id} кикнут!`;
const help = `введите ```/ban``` чтобы забаните пользователя,
```/unban``` чтобы разбанить
и ```/kick``` чтобы кикнуть без возможности возвращения`;
module.exports = {
  newChatMembers,
  banUserIsAnAdmin,
  chatMemberIsNotAnAdmin,
  userBanned,
  userKicked,
  userUnBanned,
  help,
};
