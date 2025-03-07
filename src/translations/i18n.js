import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Translation files
import english from '../translations/en.json';
import hindi from '../translations/hi.json';

// Detect the user's language
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    AsyncStorage.getItem('user-language', (err, language) => {
      if (err || !language) {
        const bestLanguage = Localization.findBestAvailableLanguage([
          'english',
          'hindi',
        ]);
        callback(bestLanguage?.languageTag || 'english');
      } else {
        callback(language);
      }
    });
  },
  init: () => {},
  cacheUserLanguage: language => {
    AsyncStorage.setItem('user-language', language);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'english',
    lng: 'english',
    resources: {
      english: {translation: english},
      hindi: {translation: hindi},
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
