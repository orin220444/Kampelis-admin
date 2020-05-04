module.exports = (ctx) => {
    ctx.telegram.sendDice(ctx.chat.id, {emoji: '🎯'})
}
