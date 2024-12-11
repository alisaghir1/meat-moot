'use client'
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";

const Celebrities = () => {
  // Example data for celebrity images
  const celebrities = [
      { image: '/celeb2.webp' },
      { image: '/celeb1.webp' },
      { image: '/celeb5.jpeg' },
      { image: '/celeb6.jpeg' },
      {  image: '/celeb3.jpeg' },
      {  image: '/celeb4.jpeg' },

  ];

  return (
    <div className="px-4 py-8 lg:px-16 lg:py-16 bg-gradient-to-b from-black via-gray-900 to-black">
      <motion.div
        variants={fadeIn("right", 0.6)}
        initial="hidden"
        whileInView={"show"}
         viewport={{ once: false, amount: 0.4 }}
      className="text-center space-y-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange">
          Celebrities Favorite Meat Restaurant
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
          Discover the unforgettable moments and flavors that our celebrity guests love. Our meals have a unique story, and each celebrity visit adds to the legacy of our restaurant.
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
           key={index} className="relative group overflow-hidden rounded-lg mt-10">
            {/* Image Section */}
            <Image
              src={celebrity.image}
              alt={`celeb image ${index}`}
              width={1080}
              height={1080}
              className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
            />
            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Celebrities;
