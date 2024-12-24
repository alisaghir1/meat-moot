'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa"; // Import the caret down icon
import navTrans from "../translation/navTrans.js"; // Import the navbar translations
import { useAppContext } from "../context/index.jsx"; // Import the context to get/set the language

const links = [
  { path: "/", key: "home" },
  { path: "/#menu", key: "menu" },
  { path: "about", key: "about" },
  { path: "contact", key: "contact" },
  { path: "media", key: "media" },
  { path: "branches", key: "branches" },
];

const branches = [
  { path: "/jbr", key: "jbr" },
  { path: "/city-walk", key: "city_walk" },
  { path: "/al-qana", key: "al_qana" },
  { path: "/khawaneej", key: "khawaneej" },
  { path: "/dubai-hills", key: "dubai_hills" },
];

const languages = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "ar", label: "العربية" },
];

const Nav = ({ containerStyles, linkStyles }) => {
  const [showDropdown, setShowDropdown] = useState(false); // For media dropdown
  const [showBranchesDropdown, setShowBranchesDropdown] = useState(false); // For branches dropdown
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
                  className={`transform transition-all ${
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
        } else if (link.key === "branches") {
          return (
            <div key={index} className="relative">
              <button
                onClick={() => setShowBranchesDropdown(!showBranchesDropdown)}
                className={`${linkStyles} cursor-pointer flex items-center`}
              >
                <span className="hover:text-orange transition-all duration-300">
                  {t[link.key]}
                </span>
                <FaCaretDown
                  className={`transform transition-all ${
                    showBranchesDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showBranchesDropdown && (
                <div className="absolute bg-black-heavy text-white p-4 text-sm rounded shadow-lg mt-1">
                  {branches.map((branch, i) => (
                    <Link
                      key={i}
                      onClick={() => setShowBranchesDropdown(false)}
                      href={branch.path}
                      className="block px-6 py-2 hover:text-orange"
                    >
                      {t[branch.key]}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }
        return (
          <Link key={index} href={link.path} className={`${linkStyles}`}>
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
            className={`transform transition-all ${
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
