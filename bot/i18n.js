import I18n from 'telegraf-i18n';
import path from 'path';
const i18n = new I18n({
  directory: path.resolve(__dirname, '../locales'),
  defaultLanguage: 'ru',
  defaultLanguageOnMissing: true,
});
export default i18n;
