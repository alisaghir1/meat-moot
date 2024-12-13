'use client'
import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { FaLongArrowAltDown } from "react-icons/fa";
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';



const jbr = [
  { image: '/khawaneej/kh1.jpg' },
  { image: '/khawaneej/kh2.jpg' },
  { image: '/khawaneej/kh3.jpg' },
  { image: '/khawaneej/kh4.jpg' },
  { image: '/khawaneej/kh5.jpg' },
  { image: '/khawaneej/kh6.jpg' },
  { image: '/khawaneej/kh7.jpg' },
  { image: '/khawaneej/kh8.jpg' },

];

const page = () => {
  return (
    <div className='mt-20 px-5 xl:px-10'>
      <div className='flex flex-col justify-center text-center items-center'>
      <h2 className='text-orange mt-20 mbp-10'>
      Meat Moot Al Khawaneej Branch
      </h2>
      <p className='text-white'>
      Located in the heart of Al Khawaneej, Meat Moot brings the best of smoked meats to this vibrant and dynamic community. Our Al Khawaneej branch offers a cozy yet modern atmosphere, perfect for enjoying mouthwatering dishes with family and friends. Whether you&apos;re looking to savor our signature smoked meats or indulge in a hearty meal, Meat Moot Al Khawaneej is the ideal spot for food lovers. Experience exceptional flavors and warm hospitality in one of Dubai&apos;s most charming neighborhoods!
      </p>
      <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8 mt-10">
        {jbr.map((celebrity, index) => (
          <motion.div
            variants={fadeIn("left", 0.8)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.4 }}
            key={index}
            className="relative group overflow-hidden rounded-lg"
          >
            {/* Image Section */}
            <Image
              src={celebrity.image}
              alt={`celeb image ${index}`}
              width={1080}
              height={1080}
              className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105  mt-5"
            />
            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        ))}
      </div>
      <div className='flex flex-col justify-center items-center my-20 text-white gap-5'>
        <h2 className='text-white'>
        Let&apos;s Meat At AL Khawaneej!
        </h2>
        <FaLongArrowAltDown className='text-4xl' />
        <h2 className='underline'>
          <Link target='_blank' href={'https://maps.app.goo.gl/Beo8YAbVYahyi5H46'}>
          <Button variant='orange'>Get Directions</Button>
          </Link>
        </h2>
      </div>
      </div>
    </div>
  )
}

export default page