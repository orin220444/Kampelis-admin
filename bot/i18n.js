import I18n from 'telegraf-i18n';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const i18n = new I18n({
  directory: path.resolve(__dirname, '../locales'),
  defaultLanguage: 'ru',
  defaultLanguageOnMissing: true,
});
