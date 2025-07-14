import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 翻訳ファイルのインポート
import translationEN from './locales/en/translation.json';
import translationJA from './locales/ja/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ja: {
    translation: translationJA,
  },
};

i18n
  .use(initReactI18next) // react-i18nextをi18nextに接続
  .init({
    resources,
    lng: 'ja', // デフォルト言語
    fallbackLng: 'en', // 見つからない場合のフォールバック言語
    interpolation: {
      escapeValue: false, // ReactはXSS対策済みなのでfalse
    },
  });

export default i18n;
