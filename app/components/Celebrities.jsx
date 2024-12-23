// Celebrities.js
'use client'
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import { useAppContext } from "../context"; // Import global language context
import celebrityTrans from "../translation/celebrityTrans.js"; // Import the translations

const Celebrities = () => {
  const [ language ] = useAppContext(); // Get the current language from context

  // Get the translated text for the current language
  const { title, description } = celebrityTrans[language];

  // Example data for celebrity images
  const celebrities = [
    { image: '/celeb1.webp' },
    { image: '/celeb5.jpeg' },
    { image: '/celeb2.webp' },
    { image: '/celeb7.jpg' },
    { image: '/celeb3.jpeg' },
    { image: '/celeb4.jpeg' },
    { image: '/celeb8.jpg' },
    { image: '/celeb9.jpg' },
  ];

  return (
    <div className="px-4 py-7 xl:px-16 lg:py-16 bg-gradient-to-b from-black-heavy via-black to-black-heavy">
      <motion.div
        variants={fadeIn("right", 0.6)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }}
        className="text-center space-y-6 mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange">
          {title}
        </h1>
        <p className="text-white text-center">
          {description}
        </p>
      </motion.div>

      {/* Stylish Grid Section */}
      <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8">
        {celebrities.map((celebrity, index) => (
          <motion.div
            variants={fadeIn("left", 0.8)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.4 }}
            key={index}
            className="relative group overflow-hidden rounded-lg mt-10"
          >
            {/* Image Section */}
            <Image
              src={celebrity.image}
              alt={`celeb image ${index}`}
              width={1080}
              height={1080}
              className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
            />
            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Celebrities;
