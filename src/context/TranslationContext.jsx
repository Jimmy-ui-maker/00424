"use client";
import { createContext, useContext, useState, useEffect } from "react";
import en from "@/translations/en.json";
import ha from "@/translations/ha.json";
import ig from "@/translations/ig.json";
import yo from "@/translations/yo.json";
import zh from "@/translations/zh.json";

const translations = {
  English: en,
  Hausa: ha,
  Igbo: ig,
  Yoruba: yo,
  Chinese: zh,
};

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState("English");

  // ⬅️ Load saved language
  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  // ⬅️ Save on change
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem("language", lang);
    }
  };

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