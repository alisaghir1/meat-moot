'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { useAppContext } from '../../context';
import smokingHistoryTrans from '../../translation/smokingHistoryTrans';

const SmokingHistory = () => {
  const [languege] = useAppContext();

  return (
    <div className="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16 relative mt-32">
      {/* Header Section */}
      <motion.div 
        variants={fadeIn('down', 0.8)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.4 }}
        className="flex flex-col items-center justify-center mb-10"
      >
        <h1 className="text-orange font-bold text-center text-4xl mb-6">
          {smokingHistoryTrans[languege].title}
        </h1>
      </motion.div>

      {/* Blog Image */}
      <motion.div 
        variants={fadeIn('up', 0.6)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.4 }}
        className="mb-8"
      >
        <img
          src="/blogs/blog5-1.jpg"
          alt={smokingHistoryTrans[languege].title}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      </motion.div>

      {/* Blog Content */}
      <motion.div 
        variants={fadeIn('up', 0.8)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        {smokingHistoryTrans[languege].content.map((item, index) => (
          <div key={index} className="mb-6">
            {item.type === 'paragraph' && (
              <p className="text-white text-lg leading-relaxed mb-4">
                {item.text}
              </p>
            )}
          </div>
        ))}
      </motion.div>

      {/* Additional Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <motion.div 
          variants={fadeIn('left', 0.6)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.4 }}
        >
          <img
            src="/blogs/blog5-2.jpg"
            alt="Smoking History 2"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </motion.div>
        <motion.div 
          variants={fadeIn('up', 0.8)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.4 }}
        >
          <img
            src="/blogs/blog5-3.jpg"
            alt="Smoking History 3"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </motion.div>
        <motion.div 
          variants={fadeIn('right', 1.0)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.4 }}
        >
          <img
            src="/menu/menu-2.jpg"
            alt="Smoking History 4"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SmokingHistory;
