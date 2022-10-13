import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en/translationEN.json";
import translationFR from "./fr/translationFR.json";
import translationAR from "./ar/translationAR.json";
i18n

  .use(initReactI18next)

  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      fr: {
        translation: translationFR,
      },
      ar: {
        translation: translationAR,
      },
    },
    lng: "fr", // if you're using a language detector, do not define the lng option
    fallbackLng: ["en", "ar"],
    debug: true,
    keySeparator: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
