"use client"
import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [useJapanese, setUseJapanese] = useState(false);

  const toggleLanguage = () => {
    setUseJapanese(prev => !prev);
  };

  return (
    <LanguageContext.Provider value={{ useJapanese, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
