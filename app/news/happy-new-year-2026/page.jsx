'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { FaLongArrowAltDown } from "react-icons/fa";
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { useAppContext } from '../../context';
import happyNewYear2026Trans from '../../translation/news/happyNewYear2026Trans.js';

const newsImages = [
  { image: '/news/interior-design-dubai-2026.jpg' },
];

const Page = () => {
  const [language] = useAppContext();
  const t = happyNewYear2026Trans[language];

  return (
    <div className='mt-20 px-5 xl:px-10'>
      <div className='flex flex-col justify-center text-center items-center'>
        <motion.h1 
          variants={fadeIn('down', 0.6)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.4 }}
          className='text-orange mt-20 mb-5 text-3xl lg:text-4xl font-bold'
        >
          {t.title}
        </motion.h1>
        <motion.p 
          variants={fadeIn('up', 0.8)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.4 }}
          className='text-white text-lg mb-10 max-w-4xl'
        >
          {t.description}
        </motion.p>

        {/* Featured Image */}
        <motion.div
          variants={fadeIn('up', 0.6)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.4 }}
          className="max-w-4xl mx-auto mb-10"
        >
          <Image
            src="/news/interior-design-dubai-2026.jpg"
            alt="Happy New Year 2026 from Meat Moot"
            width={1200}
            height={800}
            className="object-cover w-full h-full rounded-lg"
          />
        </motion.div>

        {/* Article Content */}
        <div className="max-w-6xl mx-auto mb-10">
          {t.content.map((section, index) => (
            <motion.div
              key={index}
              variants={fadeIn('left', 0.6 + index * 0.2)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.4 }}
              className="mb-8 text-left"
            >
              {section.title && (
                <h2 className="text-orange text-2xl font-bold mb-4">{section.title}</h2>
              )}
              <p className="text-white text-lg leading-relaxed">{section.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className='flex flex-col justify-center items-center my-20 text-white gap-5'>
          <motion.h2 
            variants={fadeIn('up', 0.6)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.4 }}
            className='text-white text-2xl font-bold'
          >
            {language === 'ar' ? 'احجز طاولتك الآن' : language === 'ru' ? 'Забронируйте столик' : 'Book Your Table Now'}
          </motion.h2>
          <FaLongArrowAltDown className='text-4xl text-orange' />

          <div className='flex justify-center text-center items-center gap-5'>
            <Link href="/contact">
              <Button className='w-40 border border-orange hover:bg-black hover:text-white' variant='orange'>
                {language === 'ar' ? 'احجز الآن' : language === 'ru' ? 'Забронировать' : 'Book Now'}
              </Button>
            </Link>
            <Link href="tel:+9710581264843">
              <Button className='w-40 border border-orange hover:bg-orange hover:text-white' variant='black'>
                {language === 'ar' ? 'اتصل بنا' : language === 'ru' ? 'Позвоните нам' : 'Call Us'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
