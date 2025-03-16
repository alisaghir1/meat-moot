'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { FaLongArrowAltDown } from "react-icons/fa";
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { useAppContext } from '../context';
import alQanaTrans from '../translation/alQanaTrans.js';

const jbrImages = [
  { image: '/al-qana/aq1.jpg' },
  { image: '/al-qana/aq2.jpg' },
  { image: '/al-qana/aq3.jpg' },
  { image: '/al-qana/aq4.jpg' },
  { image: '/al-qana/aq5.jpg' },
  { image: '/al-qana/aq6.jpg' },
  { image: '/al-qana/aq7.jpg' },
  { image: '/al-qana/aq8.jpg' },
];

const Page = () => {
  const  [ language ] = useAppContext(); // Access the current language
  const t = alQanaTrans[language]; // Get translations based on language

  return (
    <div className='mt-20 px-5 xl:px-10'>
      <div className='flex flex-col justify-center text-center items-center'>
        <h2 className='text-orange mt-20 mbp-10'>
          {t.title}
        </h2>
        <p className='text-white'>
          {t.description}
        </p>
        <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8 mt-10">
          {jbrImages.map((item, index) => (
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
                alt={`jbr image ${index}`}
                width={1080}
                height={1080}
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105  mt-5"
              />
            </motion.div>
          ))}
        </div>
        <div className='flex flex-col justify-center items-center my-20 text-white gap-5'>
          <h2 className='text-white'>
            {t.lets_meat}
          </h2>
          <FaLongArrowAltDown className='text-4xl' />

          <div className="flex justify-center text-center items-center gap-5">
            <h2 className="underline">
            <Link target='_blank' href={'https://maps.app.goo.gl/aaL1cHsTTQCRtoq3A'}>
                <Button
                  className="w-30 border border-orange hover:bg-black hover:text-white"
                  variant="orange"
                >
                  {t.get_directions}
                </Button>
              </Link>
            </h2>
            <h2 className="underline">
              <Link href="tel:+9710586903040">
                <Button
                  className="w-30 border border-orange hover:bg-orange hover:text-white"
                  variant="black"
                >
                  {t.call_us}
                </Button>
              </Link>
            </h2>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;
