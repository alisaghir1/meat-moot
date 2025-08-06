'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context';
import { fadeIn } from '../../../variants';

// Import translations
import seasonalMenuSpecialsTrans from '../../translation/blogs/seasonalMenuSpecialsTrans';

const SeasonalMenuSpecialsPage = () => {
  const [language] = useAppContext();
  const trans = seasonalMenuSpecialsTrans[language];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <motion.section 
        variants={fadeIn('up', 0.8)}
        initial="hidden"
        animate="show"
        className="relative h-[400px] md:h-[500px] overflow-hidden"
      >
        <Image
          src="/carousel/cr3.jpg"
          alt="Seasonal Menu Specials"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {trans.title}
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              {trans.subtitle}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div 
          variants={fadeIn('up', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {/* Introduction */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {trans.sections.introduction.heading}
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              {trans.sections.introduction.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          {/* Side Image */}
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src="/menu/meat2.webp"
              alt="Seasonal ingredients"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Summer Specials */}
        <motion.div 
          variants={fadeIn('left', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[350px] rounded-lg overflow-hidden">
              <Image
                src="/carousel/cr1.jpg"
                alt="Summer specials"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {trans.sections.summer.heading}
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                {trans.sections.summer.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fall Specials */}
        <motion.div 
          variants={fadeIn('right', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {trans.sections.fall.heading}
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                {trans.sections.fall.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative h-[350px] rounded-lg overflow-hidden">
              <Image
                src="/menu/meat3.webp"
                alt="Fall specials"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Winter Specials */}
        <motion.div 
          variants={fadeIn('left', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[350px] rounded-lg overflow-hidden">
              <Image
                src="/carousel/cr5.jpg"
                alt="Winter specials"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {trans.sections.winter.heading}
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                {trans.sections.winter.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Spring Specials */}
        <motion.div 
          variants={fadeIn('right', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {trans.sections.spring.heading}
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                {trans.sections.spring.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative h-[350px] rounded-lg overflow-hidden">
              <Image
                src="/carousel/cr2.jpg"
                alt="Spring specials"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Seasonal Ingredients */}
        <motion.div 
          variants={fadeIn('left', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[350px] rounded-lg overflow-hidden">
              <Image
                src="/menu/meat4.webp"
                alt="Seasonal ingredients"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {trans.sections.ingredients.heading}
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                {trans.sections.ingredients.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chef's Recommendations */}
        <motion.div 
          variants={fadeIn('right', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {trans.sections.recommendations.heading}
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                {trans.sections.recommendations.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative h-[350px] rounded-lg overflow-hidden">
              <Image
                src="/carousel/cr4.jpg"
                alt="Chef recommendations"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Conclusion */}
        <motion.div 
          variants={fadeIn('up', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center bg-gray-50 rounded-lg p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {trans.sections.conclusion.heading}
          </h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
            {trans.sections.conclusion.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SeasonalMenuSpecialsPage;
