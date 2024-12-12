'use client';
import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [language, setLanguage] = useState("en");
  const [isHydrated, setIsHydrated] = useState(false); // Track hydration state

  // Function to set a cookie
  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
  };

  // Function to get a cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // Load language from cookies after hydration
  useEffect(() => {
    const storedLanguage = getCookie("language") || "en";
    setLanguage(storedLanguage);
    setIsHydrated(true); // Mark hydration complete
  }, []);

  // Function to update language and save to cookies
  const updateLanguage = (lang) => {
    setLanguage(lang);
    setCookie("language", lang, 30); // Save language in cookie for 30 days
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
