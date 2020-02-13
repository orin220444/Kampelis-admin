const I18n = require('telegraf-i18n');
const path = require('path');
const i18n = new I18n({
  directory: path.resolve(__dirname, 'locales'),
  defaultLanguage: 'ru',
  defaultLanguageOnMissing: true,
});
module.exports = i18n;
