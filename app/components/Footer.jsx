'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.svg";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { TbBrandTripadvisor } from "react-icons/tb";
import { useAppContext } from "../context"; // Adjust path
import footerTrans from "../translation/footerTrans"; // Adjust path

// Function to convert Western digits to Arabic numerals
const convertToArabicNumerals = (str) => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/\d/g, (digit) => arabicNumerals[digit]);
};

const Footer = () => {
  const [language] = useAppContext();  // Get the current language from context

  // Conditionally convert phone number if language is Arabic
  const phoneNumber = "+971 58 126 4843";
  const arabicPhoneNumber = language === 'ar' ? convertToArabicNumerals(phoneNumber) : phoneNumber;

  return (
    <footer 
      className={`px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ${language === 'ar' ? 'text-right' : ''}`}
    >
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Link
            href="/"
            aria-label="Go home"
            title="Company"
            className="inline-flex items-center"
          >
            <Image width={125} height={35} src={logo} alt="logo" />
          </Link>
          <div className="mt-6 lg:max-w-sm">
            <p className="text-sm text-white">
              {footerTrans[language].description}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-base font-bold tracking-wide text-orange">
            {footerTrans[language].contacts}
          </p>
          <div className="flex items-center">
            <p className="mr-1 text-orange">{footerTrans[language].phone}</p>
            <Link
              href={`tel:${phoneNumber}`}
              aria-label="Our phone"
              title="Our phone"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              {language === 'ar' ? arabicPhoneNumber : phoneNumber}
            </Link>
          </div>
          <div className="flex items-center">
            <p className="mr-1 text-orange">{footerTrans[language].email}</p>
            <Link
              href="mailto:info@lorem.mail"
              aria-label="Our email"
              title="Our email"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              hello@meatmoot.ae
            </Link>
          </div>
        </div>

        <div>
          <span className="text-base font-bold tracking-wide text-orange">
            {footerTrans[language].social}
          </span>
          <div className="flex items-center mt-1  gap-6">
            <Link
              target="_blank"
              href="https://x.com/meatmoot_sa?mx=2"
              rel="noopener noreferrer"
              className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <RiTwitterXLine className="h-6" />
            </Link>
            <Link
              target="_blank"
              href="https://www.instagram.com/meat_moot/#"
              rel="noopener noreferrer"
              className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <FaInstagram className="h-6" />
            </Link>
            <Link
              target="_blank"
              href="https://www.facebook.com/meatmoot/"
              rel="noopener noreferrer"
              className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <FaFacebookF className="h-5" />
            </Link>
            <Link
              target="_blank"
              href="https://www.tripadvisor.com/Restaurant_Review-g293974-d24170084-Reviews-Meat_Moot-Istanbul.html"
              rel="noopener noreferrer"
              className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <TbBrandTripadvisor className="h-6" />
            </Link>
            <Link
              target="_blank"
              href="https://www.tiktok.com/@meatmoot1"
              rel="noopener noreferrer"
              className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <svg
                fill="currentColor"
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-5"
              >
                <title>TikTok icon</title>
                <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </Link>
          </div>
          <p className="mt-4 text-sm text-white">
            {footerTrans[language].followUs}
          </p>
        </div>
      </div>

      <div className="flex items-center flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
        <p className="text-sm text-white">
          {footerTrans[language].copyright}
        </p>
        <ul className="flex gap-3 items-center flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
          <li>
            <Link
              href="/terms"
              className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              {footerTrans[language].privacyPolicy}
            </Link>
          </li>
          <li>
            <Link
              href="/terms"
              className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              {footerTrans[language].terms}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
