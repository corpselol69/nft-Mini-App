import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";

export async function initI18n() {
  i18next
    .use(
      resourcesToBackend(
        (lng: string, ns: string) => import(`../locales/${lng}/${ns}.json`)
      )
    )
    .use(initReactI18next)
    .use(LanguageDetector);

  await i18next.init({
    lng: "ru",
    fallbackLng: "ru",
    ns: ["common", "market"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

  return i18next;
}

export default i18next;
