module.exports = async (ctx) => {
  const darts = await ctx.replyWithDice({emoji: '🎯'});
  console.log(darts);
  if (darts.dice.value === 6) {
    ctx.reply('поздравляю, вы попали!');
  } else if (darts.dice.value === 1) {
    ctx.reply('упс');
  } else {
    ctx.reply('к сожалению, вы промахнулись!');
  }
};
