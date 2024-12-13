'use client'
import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { FaLongArrowAltDown } from "react-icons/fa";
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';



const jbr = [
  { image: '/city-walk/ct1.jpg' },
  { image: '/city-walk/ct2.jpg' },
  { image: '/city-walk/ct3.jpg' },
  { image: '/city-walk/ct4.jpg' },
  { image: '/city-walk/ct5.jpg' },
  { image: '/city-walk/ct6.jpg' },
  { image: '/city-walk/ct7.jpg' },
  { image: '/city-walk/ct8.jpg' },

];

const page = () => {
  return (
    <div className='mt-20 px-5 xl:px-10'>
      <div className='flex flex-col justify-center text-center items-center'>
      <h2 className='text-orange mt-20 mb-10'>
      Meat Moot City Walk, Dubai Branch
      </h2>
      <p className='text-white'>
      Situated in the vibrant City Walk district of Dubai, Meat Moot invites you to indulge in the finest smoked meats in a contemporary urban setting. With its modern ambiance and stylish design, our City Walk branch offers the perfect blend of great food and a lively atmosphere. Whether you&apos;re enjoying a casual meal with friends or celebrating a special occasion, Meat Moot City Walk provides an unforgettable dining experience. Come join us for an exceptional culinary journey right in the heart of Dubai!
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
        Let&apos;s Meat At City Walk!
        </h2>
        <FaLongArrowAltDown className='text-4xl' />
        <h2 className='underline'>
          <Link target='_blank' href={'https://maps.app.goo.gl/JG8LT54EtdtL6YYi9'}>
          <Button variant='orange'>Get Directions</Button>
          </Link>
        </h2>
      </div>
      </div>
    </div>
  )
}

export default page