import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationPL from './locales/pl/translation.json';

i18n.use(initReactI18next).init({
        resources: {
            en: { translation: translationEN },
            pl: { translation: translationPL }
        },
        lng: localStorage.getItem("i18nextLng") || "en",
        fallbackLng: 'en',
        interpolation: { escapeValue: false }
    });

export default i18n;
