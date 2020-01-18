const gifs = require('../config/gifs.json');
module.exports = (ctx) => {
  try {
    const gif = gifs.f;
    const randomGif = gif[Math.floor(Math.random() * gif.length)];
    ctx.replyWithDocument(randomGif,
        {reply_to_message_id: ctx.message.message_id},
    );
  } catch (error) {
    console.log(error);
  };
};

