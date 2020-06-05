import i18next from 'i18next';
import ICU from 'i18next-icu';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(ICU)
  .init({
    detection: {
      order: ['querystring', 'htmlTag', 'localStorage', 'navigator'],
    },
    fallbackLng: 'en',
  });

export const translations = i18next;
