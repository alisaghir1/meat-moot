'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import Image from 'next/image';
import { FaLongArrowAltDown } from "react-icons/fa";
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { useAppContext } from '../../context';
import dubaiGrandOpeningTrans from '../../translation/dubaiGrandOpeningTrans';

const DubaiGrandOpening = () => {
  const [languege] = useAppContext();

  const images = [
    '/news/news6-1.jpg',
    '/news/news6-2.jpg',
    '/news/news6-3.jpg',
    '/news/news6-4.jpg',
    '/news/news6-5.jpg',
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
          {dubaiGrandOpeningTrans[languege].headerTitle}
        </motion.h1>
        <motion.p 
          variants={fadeIn('up', 0.8)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.4 }}
          className='text-white text-lg mb-10 max-w-4xl'
        >
          {dubaiGrandOpeningTrans[languege].headerDescription}
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
            alt={dubaiGrandOpeningTrans[languege].headerTitle}
            width={1080}
            height={600}
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
            priority
          />
        </motion.div>

        {/* Content Sections with Strategic Image Placement */}
        <div className="max-w-6xl mx-auto mb-10 text-left">
          {/* First 2 paragraphs - Introduction */}
          {dubaiGrandOpeningTrans[languege].content.slice(0, 2).map((item, index) => (
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

          {/* Grand Opening Event Image */}
          <motion.div 
            variants={fadeIn('right', 0.8)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.4 }}
            className="my-8 max-w-3xl mx-auto"
          >
            <div className="relative group overflow-hidden rounded-lg">
              <Image
                src={images[1]}
                alt="Dubai Grand Opening Event"
                width={900}
                height={600}
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Next 2 paragraphs - Global expansion */}
          {dubaiGrandOpeningTrans[languege].content.slice(2, 4).map((item, index) => (
            <motion.p 
              key={index + 2}
              variants={fadeIn('left', 0.6 + (index + 2) * 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.4 }}
              className="text-white text-lg leading-relaxed mb-6"
            >
              {item.paragraph}
            </motion.p>
          ))}

          {/* Celebrity Attendees Image */}
          <motion.div 
            variants={fadeIn('left', 1.0)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.4 }}
            className="my-8 max-w-3xl mx-auto"
          >
            <div className="relative group overflow-hidden rounded-lg">
              <Image
                src={images[2]}
                alt="Celebrity Attendees at Grand Opening"
                width={900}
                height={600}
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Celebrity attendance paragraph */}
          <motion.p 
            variants={fadeIn('left', 1.2)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.4 }}
            className="text-white text-lg leading-relaxed mb-6"
          >
            {dubaiGrandOpeningTrans[languege].content[4].paragraph}
          </motion.p>

          {/* Restaurant Interior/Exterior Image */}
          <motion.div 
            variants={fadeIn('right', 1.4)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.4 }}
            className="my-8 max-w-3xl mx-auto"
          >
            <div className="relative group overflow-hidden rounded-lg">
              <Image
                src={images[3]}
                alt="Meat Moot City Walk Interior Design"
                width={900}
                height={600}
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Remaining paragraphs */}
          {dubaiGrandOpeningTrans[languege].content.slice(5).map((item, index) => (
            <motion.p 
              key={index + 5}
              variants={fadeIn('left', 0.6 + (index + 5) * 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.4 }}
              className="text-white text-lg leading-relaxed mb-6"
            >
              {item.paragraph}
            </motion.p>
          ))}
        </div>

        {/* Remaining Images Gallery */}
        <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 [&>img:not(:first-child)]:mt-8 mt-10 max-w-4xl">
          {images.slice(4).map((image, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", 0.8 + index * 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.4 }}
              className="relative group overflow-hidden rounded-lg"
            >
              <Image
                src={image}
                alt={`Dubai Grand Opening ${index + 5}`}
                width={800}
                height={1000}
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
            {dubaiGrandOpeningTrans[languege].callToAction.title}
          </motion.h2>
          <motion.p 
            variants={fadeIn('up', 0.8)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.4 }}
            className='text-white text-lg max-w-2xl text-center mb-5'
          >
            {dubaiGrandOpeningTrans[languege].callToAction.description}
          </motion.p>
          <FaLongArrowAltDown className='text-4xl text-orange' />

          <div className='flex justify-center text-center items-center gap-5'>
            <Link href='https://maps.app.goo.gl/1DLEdMzpDd3uvDRj7' target='_blank'>
              <Button className='w-40 border border-orange hover:bg-orange hover:text-white' variant='black'>
                {dubaiGrandOpeningTrans[languege].callToAction.buttonText}
              </Button>
            </Link>
            <Link href="tel:+971561888843">
              <Button className='w-40 border border-orange hover:bg-black hover:text-white' variant='orange'>
                Call Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DubaiGrandOpening;
