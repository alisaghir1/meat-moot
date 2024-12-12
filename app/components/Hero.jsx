"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { fadeIn } from "@/variants";
import Link from "next/link";
import { useAppContext } from "../context"; // Import the context to get language

import heroTrans from "../translation/heroTrans.js"; // Import translation file

const Hero = () => {
  const [language] = useAppContext(); // Get current language from context

  // Fallback to English if the language is invalid or undefined
  const t = heroTrans[language] || heroTrans.en;

  const isRtl = language === "ar"; // Check if the language is Arabic (rtl)

  return (
    <section
      id="home"
      className="bg-hero2 xl:bg-hero bg-no-repeat relative xl:bg-cover xl:h-[1098px] py-40 pb-32 xl:py-0"
    >
      <div className="container mx-auto">
        <div className="flex items-center xl:h-[960px]">
        <div className={`w-full xl:max-w-[460px] text-center ${isRtl ? 'xl:text-right' : ''} font-geis`}>
            <motion.h1
              variants={fadeIn("down", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.4 }}
              className="text-white mb-7"
            >
              {t.title.split("\n").map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}
            </motion.h1>
            <motion.p
              variants={fadeIn("down", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.4 }}
              className="font-semibold mb-7 text-orange"
            >
              {t.subtitle}
            </motion.p>
            <motion.p
              variants={fadeIn("down", 0.8)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.4 }}
              className="mb-7 text-white font-base"
            >
              {t.description}
            </motion.p>
            <motion.div
              variants={fadeIn("down", 1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.4 }}
            >
              <Link href={'/#reservation'}>
                <Button variant="orange">{t.button}</Button>
              </Link>
            </motion.div>
          </div>
          
          {/* Conditionally positioning image */}
          <motion.div
            variants={fadeIn("up", 1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.4 }}
            className={`hidden xl:flex xl:absolute xl:top-[200px] ${isRtl ? 'xl:left-[-40]' : 'xl:right-0'}`} // Position based on rtl/ltr
          >
            <Image
              height={682}
              width={900}
              alt="meat dish"
              src={"/main11.png"}
            ></Image>
          </motion.div>
        </div>
      </div>
      
      {/* Another conditional image */}
      <motion.div
        variants={fadeIn("up", 1.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }}
        className={`hidden xl:flex xl:relative xl:-top-24 z-50 ${isRtl ? 'xl:left-0' : 'xl:right-0'}`} // Position based on rtl/ltr
      >
        <Image
          height={404}
          width={320}
          alt="meat dish"
          src={"/main3rm.png"}
        ></Image>
      </motion.div>
    </section>
  );
};

export default Hero;
