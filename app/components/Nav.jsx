'use client'
import Link from "next/link";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa"; // Import the caret down icon
import navTrans from "../translation/navTrans.js"; // Import the navbar translations
import { useAppContext } from "../context/index.jsx"; // Import the context to get/set the language
import { useEffect } from "react";

const links = [
  { path: "/", key: "home" },
  { path: "/#menu", key: "menu" },
  { path: "branches", key: "branches" },
  { path: "about", key: "about" },
  { path: "media", key: "media" },
  { path: "contact", key: "contact" },
];
  
const languages = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "ar", label: "العربية" },
];

const Nav = ({ containerStyles, linkStyles }) => {
  const [showDropdown, setShowDropdown] = useState(false); // For media dropdown
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false); // For language dropdown
  const [language, setLanguage] = useAppContext(); // Get and set language from context

  const t = navTrans[language] || navTrans.en; // Current language translations

  useEffect(() => {
    // Update the direction when the language changes
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
  }, [language]); // This effect runs whenever the language changes

  return (
    <nav className={`${containerStyles}`}>
      {/* Links */}
      {links.map((link, index) => {
        if (link.key === "media") {
          return (
            <div key={index} className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`${linkStyles} cursor-pointer flex items-center`}
              >
                <span className="hover:text-orange transition-all duration-300">
                  {t[link.key]}
                </span>
                <FaCaretDown
                  className={`ml-2 transform transition-all ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showDropdown && (
                <div className="absolute bg-black-heavy text-white p-2 rounded shadow-lg mt-1">
                  <Link
                    onClick={() => setShowDropdown(false)}
                    href="/blogs"
                    className="block px-4 py-2 hover:text-orange"
                  >
                    {t.blogs}
                  </Link>
                  <Link
                    onClick={() => setShowDropdown(false)}
                    href="/news"
                    className="block px-4 py-2 hover:text-orange"
                  >
                    {t.news}
                  </Link>
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={index}
            href={link.path}
            className={`${linkStyles}`}
          >
            {t[link.key]}
          </Link>
        );
      })}

      {/* Language Dropdown */}
      <div className="relative ml-4">
        <button
          onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          className={`${linkStyles} cursor-pointer flex items-center`}
        >
          <span className="hover:text-orange transition-all duration-300">
            {languages.find((lang) => lang.code === language)?.label || "English"}
          </span>
          <FaCaretDown
            className={`ml-2 transform transition-all ${
              showLanguageDropdown ? "rotate-180" : ""
            }`}
          />
        </button>
        {showLanguageDropdown && (
          <div className="absolute bg-black-heavy text-white p-2 rounded shadow-lg mt-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code); // Update the context
                  setShowLanguageDropdown(false); // Close the dropdown
                }}
                className="block px-4 py-2 hover:text-orange text-left w-full"
              >
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
