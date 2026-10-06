// src/i18n/configs.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ja from "./ja.json";
import hiragana from "./hiragana.json";
import en from "./en.json";
import fr from "./fr.json";
import de from "./de.json";
import hi from "./hi.json";
import id from "./id.json";
import it from "./it.json";
import ko from "./ko.json";
import ptBR from "./pt-BR.json";
import es419 from "./es-419.json";
import es from "./es.json";
import zhCN from "./zh-CN.json";
import zhTW from "./zh-TW.json";
import ar from "./ar.json";

const supportedLanguages = [
  "ja",
  "hiragana",
  "en",
  "fr",
  "de",
  "hi",
  "id",
  "it",
  "ko",
  "pt-BR",
  "es-419",
  "es",
  "zh-CN",
  "zh-TW",
  "ar",
];

const savedLanguage = localStorage.getItem("selectedLanguage");
const initialLanguage =
  savedLanguage && supportedLanguages.includes(savedLanguage)
    ? savedLanguage
    : "ja";

document.documentElement.lang = initialLanguage;
document.documentElement.dir = initialLanguage === "ar" ? "rtl" : "ltr";

i18n.use(initReactI18next).init({
  resources: {
    ja: { translation: ja },
    hiragana: { translation: hiragana },
    en: { translation: en },
    fr: { translation: fr },
    de: { translation: de },
    hi: { translation: hi },
    id: { translation: id },
    it: { translation: it },
    ko: { translation: ko },
    "pt-BR": { translation: ptBR },
    "es-419": { translation: es419 },
    es: { translation: es },
    "zh-CN": { translation: zhCN },
    "zh-TW": { translation: zhTW },
    ar: { translation: ar },
  },
  lng: initialLanguage,
  fallbackLng: "ja",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
