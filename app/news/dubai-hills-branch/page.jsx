'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { useAppContext } from '../../context';
import newsTrans from '../../translation/news/newsTrans';
import Image from 'next/image';

const DubaiHillsBranch = () => {
  const [languege] = useAppContext();
  const newsData = newsTrans[languege].news[1]; // Second news article

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative mt-32">
      {/* Header Section */}
      <motion.div 
        variants={fadeIn('down', 0.8)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.4 }}
        className="mb-10"
      >
        <h1 className="text-orange font-bold text-4xl md:text-5xl mb-6 text-center">
          {newsData.translatedTitle}
        </h1>
        
        {/* Hero Image */}
        <div className="w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src="/news/news1-1.webp"
            alt={newsData.translatedTitle}
            width={1200}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Article Content */}
      <div className="grid grid-cols-1 gap-12">
        {newsData.content.map((section, index) => (
          <motion.div
            key={index}
            variants={fadeIn('up', 0.6 + index * 0.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.3 }}
            className="bg-black-heavy rounded-lg p-8"
          >
            <h2 className="text-orange font-bold text-2xl md:text-3xl mb-6">
              {section.translatedTitle}
            </h2>
            
            {/* Section Image */}
            <div className="w-full h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={`/news/news1-${index + 1}.webp`}
                alt={section.translatedTitle}
                width={800}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-white text-lg leading-relaxed">
              {section.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Back to News Button */}
      <motion.div
        variants={fadeIn('up', 0.8)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.4 }}
        className="mt-12 text-center"
      >
        <a
          href="/news"
          className="inline-block bg-orange hover:bg-orange-dark text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
        >
          ← Back to News
        </a>
      </motion.div>
    </div>
  );
};

export default DubaiHillsBranch;
