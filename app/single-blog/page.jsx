'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import Image from 'next/image';

const SingleBlog = () => {
  const [data, setData] = useState({ title: '', content: [] });

  useEffect(() => {
    // Retrieve the selected news item from local storage
    const storedData = localStorage.getItem('selectedNews');
    
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData); // Set the data state with the parsed news item
    }
  }, []); // Run once on component mount

  if (!data.title || data.content.length === 0) {
    return <p>Loading...</p>; // Handle the case where the data is not yet loaded
  }

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative mt-32">
      <div className="mb-16">
        {/* Render the main news title */}
        <h1 className="text-orange font-bold text-3xl mb-20">{data.title}</h1>

        {/* Map through the content array and render each content item */}
        {data.content.map((contentItem, index) => (
          <motion.div
            variants={fadeIn('left', 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }} 
            key={index} className="mb-10">
            {/* Render the title and date for each content item */}
            <h2 className="text-white font-bold text-2xl">{contentItem.title}</h2>
            <p className="text-xs text-orange">{contentItem.date}</p>

            {/* Render the text content */}
            <p className="text-white my-4">{contentItem.text}</p>

            {/* Render images for this content item */}
            <div className="">
              {contentItem.images.map((image, imgIndex) => (
                  <div key={imgIndex} className="overflow-hidden w rounded-lg shadow-lg">
                   <Image width={1920} height={1080} src={image} alt={contentItem.title} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SingleBlog;