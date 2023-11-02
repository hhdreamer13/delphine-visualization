import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const useLanguageContext = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  // Get the first two characters of the system language (e.g., 'en' from 'en-US')
  const defaultLanguage = navigator.language.substring(0, 2);

  // Check if the language is supported in your app, otherwise default to 'fr'
  const initialLanguage = ["en", "fr"].includes(defaultLanguage)
    ? defaultLanguage
    : "en";

  const [language, setLanguage] = useState(initialLanguage);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
