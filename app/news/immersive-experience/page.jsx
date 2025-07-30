'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { FaLongArrowAltDown } from "react-icons/fa";
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { useAppContext } from '../../context';
import immersiveExperienceTrans from '../../translation/immersiveExperienceTrans.js';

const newsImages = [
  { image: '/news/news2-1.webp' },
  { image: '/news/news2-2.webp' },
  { image: '/news/news2-3.webp' },
  { image: '/carousel/cr1.jpg' },
  { image: '/carousel/cr2.jpg' },
  { image: '/carousel/cr3.jpg' },
  { image: '/carousel/cr4.jpg' },
  { image: '/carousel/cr5.jpg' },
];

const Page = () => {
  const [language] = useAppContext();
  const t = immersiveExperienceTrans[language];

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
              <h2 className="text-orange text-2xl font-bold mb-4">{section.title}</h2>
              <p className="text-white text-lg leading-relaxed">{section.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8 mt-10">
          {newsImages.map((item, index) => (
            <motion.div
              variants={fadeIn("left", 0.8)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.4 }}
              key={index}
              className="relative group overflow-hidden rounded-lg"
            >
              <Image
                src={item.image}
                alt={`Immersive experience ${index + 1}`}
                width={1080}
                height={1080}
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105 mt-5"
              />
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
            Experience Meat Moot Today
          </motion.h2>
          <FaLongArrowAltDown className='text-4xl text-orange' />

          <div className='flex justify-center text-center items-center gap-5 flex-wrap'>
            <Link href='/dubai-hills'>
              <Button className='w-40 border border-orange hover:bg-black hover:text-white' variant='orange'>
                Dubai Hills
              </Button>
            </Link>
            <Link href='/jbr'>
              <Button className='w-40 border border-orange hover:bg-orange hover:text-white' variant='black'>
                JBR Branch
              </Button>
            </Link>
            <Link href='/al-qana'>
              <Button className='w-40 border border-orange hover:bg-black hover:text-white' variant='orange'>
                Al Qana
              </Button>
            </Link>
            <Link href='/city-walk'>
              <Button className='w-40 border border-orange hover:bg-orange hover:text-white' variant='black'>
                City Walk
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
