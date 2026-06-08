"use client";
import Image from "next/image";
import about from "../../public/hero-bg3.webp";
import Swipper from "../../app/components/Swipper";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import { Button } from "@/app/components/ui/button";  
import Link from "next/link";
import { useAppContext } from "../context"; // Make sure to import your context
import aboutTrans from "../translation/abouTrans.js"; // Import your translation file

const About = () => {
  const [ language ] = useAppContext(); // Assuming you have a language context
  
  const translation = aboutTrans[language] || aboutTrans.en; // Fallback to English if no language is set

  const isAr = language === "ar";

  return (
    <section className="mt-32 bg-black" dir={isAr ? "rtl" : "ltr"}>
      <div
        id="about"
        className="relative overflow-hidden mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center py-12 lg:py-20">
          {/* Text */}
          <motion.main
            variants={fadeIn(isAr ? "left" : "right", 0.8)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className={isAr ? "text-right" : "text-left"}
          >
            <h2 className="text-2xl tracking-tight font-extrabold text-orange sm:text-3xl md:text-4xl">
              {translation.aboutTitle}
            </h2>
            <p className="mt-6 text-white/80 leading-relaxed">
              {translation.aboutText1}
            </p>
            <p className="mt-4 text-white/80 leading-relaxed">
              {translation.aboutText2}
            </p>
          </motion.main>

          {/* Image */}
          <motion.div
            variants={fadeIn(isAr ? "right" : "left", 0.8)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="relative w-full aspect-[4/3] lg:aspect-[5/4] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
          >
            <Image
              src={about}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              alt="Meat Moot restaurant interior"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
      <motion.div
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }}
        className="text-center mx-5 xl:mx-10 mt-20 mb-10"
      >
        <h2 className="my-6 text-2xl tracking-tight font-extrabold text-orange sm:text-3xl md:text-4xl">
          {translation.historyTitle}
        </h2>

        <p className="text-white/80 max-w-4xl mx-auto leading-relaxed">{translation.historyText}</p>
        <h2 className="mb-6 mt-14 text-2xl tracking-tight font-extrabold text-orange sm:text-3xl md:text-4xl">
          {translation.uaeBranchesTitle}
        </h2>

        <p className="text-white/80 max-w-4xl mx-auto leading-relaxed">{translation.uaeBranchesText}</p>
      </motion.div>
      <motion.div
        variants={fadeIn("up", 0.8)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }}
      >
        <Swipper />
      </motion.div>

      <div className="flex flex-col justify-center items-center px-10  mb-12">
        <motion.h2 
        variants={fadeIn("down", 0.8)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }}
        className="my-6 text-2xl tracking-tight font-extrabold text-orange sm:text-3xl md:text-4xl">
          {translation.atmosphereTitle}
        </motion.h2>
        <motion.p
        variants={fadeIn("up", 1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }} 
        className="text-white/80 text-center max-w-4xl leading-relaxed whitespace-pre-line">{translation.atmosphereText}</motion.p>
        <Link href={'/#menu'}>
          <Button className='mt-10 w-56' variant='orange'>{translation.menuButton || 'Discover our menu'}</Button>
        </Link>
      </div>
    </section>
  );
};

export default About;
