"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Lang = "en" | "ja";
const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = sessionStorage.getItem("lang") as Lang;
    if (saved) setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    sessionStorage.setItem("lang", l);
  };
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext); 