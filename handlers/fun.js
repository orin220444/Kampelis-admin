import {writeFile} from 'fs';
import {promisify} from 'util';
const catFile = promisify(writeFile);
export const handleFun = async (ctx) => {
  const files = await catFile('../config/files.json');
  const sticker = files.durka;
  const randomSticker = sticker[Math.floor(Math.random() * sticker.length)];
  try {
    const isReply = !!ctx.message.reply_to_message;
    const message = isReply ?
      ctx.message.reply_to_message.message_id :
      ctx.message.message_id;
    ctx.replyWithSticker(randomSticker,
        {reply_to_message_id: message},
    );
  } catch (error) {
    const answer = ctx.i18n.t('error', {error: error});
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id},
    );
  }
};
