'use client';
import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  // Start with a default language during SSR
  const [language, setLanguage] = useState("en");
  const [isHydrated, setIsHydrated] = useState(false); // Track hydration state

  // Load language from localStorage after hydration
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "en";
    setLanguage(storedLanguage);
    setIsHydrated(true); // Mark hydration complete
  }, []);

  // Function to update language and save to localStorage
  const updateLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang); // Save to localStorage
  };

  // Render children only after hydration to avoid mismatches
  if (!isHydrated) {
    return null; // Or a loader/spinner if preferred
  }

  return (
    <AppContext.Provider value={[language, updateLanguage]}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
