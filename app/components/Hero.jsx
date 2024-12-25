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
      className="relative xl:h-[1098px] py-40 pb-32 xl:py-0"
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0"
       onContextMenu={(e) => e.preventDefault()}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/vidio.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-x-0 bottom-0 h-1/3  bg-gradient-to-b from-transparent via-transparent to-black-heavy" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex items-center justify-center xl:h-[960px]">
          <div className={`w-full xl:max-w-[700px] text-center font-geis`}>
            <motion.h1
              variants={fadeIn("down", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.4 }}
              className="text-white mb-7 text-3xl md:text-4xl xl:text-5xl mt-5"
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
              className="font-semibold text-xl xl:text-3xl mb-7 text-orange"
            >
              {t.subtitle}
            </motion.p>

            <motion.div
              variants={fadeIn("down", 1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.4 }}
            >
              <Link href={'/jbr'}>
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
            className={`hidden xl:flex xl:absolute xl:top-[180px] ${isRtl ? 'xl:left-[-20px] transform translate-x-[-100%]' : 'xl:right-[-20px]'}`}
          >
          </motion.div>
        </div>
      </div>
      
      {/* Another conditional image */}
      <motion.div
        variants={fadeIn("up", 1.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }}
        className={`hidden xl:flex xl:relative xl:-top-5 z-50 ${isRtl ? 'xl:left-0' : 'xl:right-0'}`} // Position based on rtl/ltr
      >
        <Image
          height={1000}
          width={1000}
          alt="meat dish"
          src={"/main11.png"}
          className="w-72 h-52"
        ></Image>
      </motion.div>
    </section>
  );
};

export default Hero;