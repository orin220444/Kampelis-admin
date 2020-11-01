import {readFile} from 'fs';
import {promisify} from 'util';
const catFile = promisify(readFile);
export const handleF = async (ctx) => {
  try {
    const files = await catFile('../config/files.json');
    const gif = files.f;
    const randomGif = gif[Math.floor(Math.random() * gif.length)];
    const isReply = !!ctx.message.reply_to_message;
    const message = isReply ?
      ctx.message.reply_to_message.message_id :
      ctx.message.message_id;
    ctx.replyWithDocument(randomGif,
        {reply_to_message_id: message},
    );
  } catch (error) {
    const answer = ctx.i18n.t('error', {error: error});
    ctx.replyWithMarkdown(answer,
        {reply_to_message_id: ctx.message.message_id},
    );
  };
};
