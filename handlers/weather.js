import weather from 'openweather-apis';
import Composer from 'telegraf/composer.js';
import WizardScene from 'telegraf/scenes/wizard/index.js';
import {promisify} from 'util';
const getWeather = promisify(weather.getAllWeather);
const checkCity = new Composer();
export const handleWeather = new WizardScene('WeatherScene', async (ctx) => {
  ctx.reply('В каком городе вы находитесь?');
  return ctx.wizard.next();
},
checkCity, (ctx) => {
  return ctx.scene.leave();
});

checkCity.on('message', async (ctx) => {
  const city = await ctx.message.text;
  weather.setCity(city);
  weather.setLang('ru');
  weather.setAPPID(process.env.OWM_KEY);
  const data = await getWeather();
  console.log(data); // sendWeather(JSONObj)
  ctx.reply(`Погода в ${data.name}
Температура: ${data.main.temp} °C
Ощущается как: ${data.main.feels_like} °C
Скорость ветра: ${data.wind.speed} м/с
Давление: ${data.main.pressure} мм рт.
Влажность: ${data.main.humidity}%`);
  return ctx.wizard.next();
});
