"use client";
import React, { useContext } from "react";
import Image from "next/image";
import about from "../../public/about.jpg";
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

  return (
    <section className="mt-32 bg-black">
      <div id="about" className="relative bg-white overflow-hidden mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100"></polygon>
            </svg>

            <div className="pt-1"></div>

            <motion.main
              variants={fadeIn("down", 1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.4 }}
              className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
            >
              <div className="sm:text-center lg:text-left">
                <h2 className="my-6 text-center text-2xl tracking-tight font-extrabold text-orange sm:text-3xl md:text-4xl">
                  {translation.aboutTitle}
                </h2>

                <p>{translation.aboutText1}</p>
                <p className="mt-6">{translation.aboutText2}</p>
              </div>
            </motion.main>
          </div>
        </div>
        <motion.div
          variants={fadeIn("right", 0.8)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.4 }}
          className={`lg:absolute lg:inset-y-0 ${language === 'ar' ? 'lg:left-0' : 'lg:right-0'}  lg:w-1/2`}
        >
          <Image
            src={about}
            className="w-full object-fill object-top sm:h-72 md:h-96 lg:w-full lg:h-full"
            alt="about image"
          />
        </motion.div>
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

        <p className="text-white">{translation.historyText}</p>
        <h2 className="mb-6 mt-14 text-2xl tracking-tight font-extrabold text-orange sm:text-3xl md:text-4xl">
          {translation.uaeBranchesTitle}
        </h2>

        <p className="text-white">{translation.uaeBranchesText}</p>
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
        className="text-white ">{translation.atmosphereText}</motion.p>
        <Link href={'/#menu'}>
          <Button className='mt-10' variant='orange'>{translation.menuButton || 'Discover our menu'}</Button>
        </Link>
      </div>
    </section>
  );
};

export default About;
