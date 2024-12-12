"use client";
import React from "react";
import Image from "next/image";
import about from "../../public/about.jpg";
import Swipper from "../../app/components/Swipper";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import { Button } from "@/app/components/ui/button";  
import Link from "next/link";

const About = () => {
  
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
                  ABOUT OUR RESTAURANT
                </h2>

                <p>
                  Founded in 2021, Meat Moot has successfully established 43
                  locations across 14 countries worldwide, and we continue to
                  diligently pursue the execution of our growth strategy, aiming
                  to penetrate new markets.
                </p>
                <p className="mt-6">
                  We are headquartered in Istanbul, Turkey. At Meat Moot
                  Restaurant, you will sit at a king’s banquet, you will be
                  presented with a feast of garnished meat cooked following
                  world-class recipes that will always leave you wanting more.
                  Traditional continues to meet modern in our kitchen, where a
                  state-of-the-art cooking facility lies next to a meat curing
                  facility.
                </p>
              </div>
            </motion.main>
          </div>
        </div>
        <motion.div
          variants={fadeIn("right", 0.8)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.4 }}
          className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
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
          Our History
        </h2>

        <p className="text-white">
          Established in 2021, we now have Meat Moot locations in 14 countries
          around the world. We are headquartered Istanbul, Turkey. Meat Moot is
          an exciting rather newly established restaurant brand, which expands
          very successfully and rapidly internationally. We are introducing a
          whole new concept of great smoked meat to the market and combining
          casual dining with great and fast service.
        </p>
        <h2 className="mb-6 mt-14 text-2xl tracking-tight font-extrabold text-orange sm:text-3xl md:text-4xl">
          UAE Branches
        </h2>

        <p className="text-white">
          DUBAI - JBR | Abu Dhabi - AL QANA | DUBAI - DUBAI HILLS | DUBAI -
          DUBAI CITY WALK | DUBAI - AL KHAWANEEJ
        </p>
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
          Atmosphere Of Our Restaurant
        </motion.h2>
        <motion.p
        variants={fadeIn("up", 1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }} 
        className="text-white ">
          The warm, industrial decor draws on cues from traditional Istanbul
          butcher shops, and the usage of warm wood, stainless steel, and dark
          marble.
          <br />
          The space succeeds in being simultaneously rustic, inviting, and
          luxurious with rich details. Interior details include an homage to a
          traditional “meat locker” interior with finished walnut planks
          covering the length of the dining room wall.
          <br />
          <br />
          The unique experience for guests is complemented by the creative
          interior design of all branches of <span className="text-orange">Meat Moot</span> restaurants, which
          accentuates to the restaurants warm atmosphere and integrates the
          iconic wooden material inspired by the restaurants identity that
          provides relaxation and tranquility.
          <br />
          <br />
          The soothing quiet music brings comfort while the guests indulge and
          unwind. From big details down to the small intricate ones have been
          given a thoughtful consideration to provide a wonderful and
          unforgettable dining experience.
        </motion.p>
        <Link href={'/#menu'}>
        <Button className='mt-10' variant='orange'>Discover our menu</Button>
        </Link>
      </div>
    </section>
  );
};

export default About;
