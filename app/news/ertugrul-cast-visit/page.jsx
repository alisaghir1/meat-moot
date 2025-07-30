'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import Image from 'next/image';
import { FaLongArrowAltDown } from "react-icons/fa";
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { useAppContext } from '../../context';
import ertugrulCastTrans from '../../translation/ertugrulCastTrans';

const ErtugrulCastVisit = () => {
  const [languege] = useAppContext();

  const images = [
    '/news/news3-1.png',
    '/news/news3-3.jpg',
    '/news/news3-4.jpg',
    '/news/news3-5.jpg'
  ];

  return (
    <div className='mt-20 px-5 xl:px-10'>
      <div className='flex flex-col justify-center text-center items-center'>
        {/* Header Section */}
        <motion.h1 
          variants={fadeIn('down', 0.6)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.4 }}
          className='text-orange mt-20 mb-5 text-3xl lg:text-4xl font-bold'
        >
          {ertugrulCastTrans[languege].headerTitle}
        </motion.h1>
        <motion.p 
          variants={fadeIn('up', 0.8)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.4 }}
          className='text-white text-lg mb-10 max-w-4xl'
        >
          {ertugrulCastTrans[languege].headerDescription}
        </motion.p>

        {/* Hero Image */}
        <motion.div 
          variants={fadeIn('up', 0.4)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.4 }}
          className="relative group overflow-hidden rounded-lg mb-10 max-w-4xl"
        >
          <Image
            src={images[0]}
            alt={ertugrulCastTrans[languege].headerTitle}
            width={1080}
            height={600}
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
            priority
          />
        </motion.div>

        {/* Content Sections */}
        <div className="max-w-6xl mx-auto mb-10 text-left">
          {ertugrulCastTrans[languege].content.map((item, index) => (
            <motion.p 
              key={index}
              variants={fadeIn('left', 0.6 + index * 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.4 }}
              className="text-white text-lg leading-relaxed mb-6"
            >
              {item.paragraph}
            </motion.p>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 [&>img:not(:first-child)]:mt-8 mt-10 max-w-6xl">
          {images.slice(1).map((image, index) => (
            <motion.div
              key={index}
              variants={fadeIn("right", 0.8 + index * 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.4 }}
              className="relative group overflow-hidden rounded-lg"
            >
              <Image
                src={image}
                alt={`Ertugrul cast visit ${index + 2}`}
                width={1080}
                height={1080}
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
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
            className='text-orange text-2xl font-bold'
          >
            {ertugrulCastTrans[languege].callToAction.title}
          </motion.h2>
          <motion.p 
            variants={fadeIn('up', 0.8)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.4 }}
            className='text-white text-lg max-w-2xl text-center mb-5'
          >
            {ertugrulCastTrans[languege].callToAction.description}
          </motion.p>
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
            <Link href='/khawaneej'>
              <Button className='w-40 border border-orange hover:bg-black hover:text-white' variant='orange'>
                Khawaneej
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErtugrulCastVisit;
