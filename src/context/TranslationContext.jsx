"use client";
import { createContext, useContext, useState } from "react";
import en from "@/translations/en.json";
import ha from "@/translations/ha.json";
import ig from "@/translations/ig.json";
import yo from "@/translations/yo.json";

const translations = {
  English: en,
  Hausa: ha,
  Igbo: ig,
  Yoruba: yo,
};

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState("English");

  const changeLanguage = (lang) => setLanguage(lang);

  const t = (key) => translations[language][key] || key;

  return (
    <TranslationContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
