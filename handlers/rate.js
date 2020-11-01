import axios from 'axios';
export const handleRate = async (ctx) => {
  axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(function(response) {
        const data = response.data.Valute;
        ctx.telegram.sendMessage(process.env.CHANNEL_ID,
            `Курс валют относительно к рублю на данный момент:
  Доллар: ${data.USD.Value},
  Евро: ${data.EUR.Value},
  Фунт стерлингов: ${data.GBP.Value},
  Юань: ${data.CNY.Value}.
  `);
      });
};
