'use client'
import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { FaLongArrowAltDown } from "react-icons/fa";
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';



const jbr = [
  { image: '/dubai-hills/db1.jpg' },
  { image: '/dubai-hills/db2.jpg' },
  { image: '/dubai-hills/db3.jpg' },
  { image: '/dubai-hills/db4.jpg' },
  { image: '/dubai-hills/db5.jpg' },
  { image: '/dubai-hills/db6.jpg' },
  { image: '/dubai-hills/db7.jpg' },
  { image: '/dubai-hills/db8.jpg' },

];

const page = () => {
  return (
    <div className='mt-20 px-5 xl:px-10'>
      <div className='flex flex-col justify-center text-center items-center'>
      <h2 className='text-orange mt-20 mb-10'>
      Meat Moot Dubai Hills Branch
      </h2>
      <p className='text-white'>
      Nestled in the serene surroundings of Dubai Hills, Meat Moot offers a tranquil dining experience with a focus on exceptional smoked meats. Our Dubai Hills branch combines a peaceful atmosphere with the perfect setting for a relaxed meal or a memorable gathering. Enjoy our signature dishes while taking in the beautiful views of the lush green landscapes. Whether you&apo;re unwinding with loved ones or celebrating a special occasion, Meat Moot Dubai Hills promises a dining experience that&apo;s as extraordinary as its surroundings.
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
        Let&apos;s Meat At Dubai Hills!
        </h2>
        <FaLongArrowAltDown className='text-4xl' />
        <h2 className='underline'>
          <Link target='_blank' href={'https://maps.app.goo.gl/osbAHFtm3kygLaWJA'}>
          <Button variant='orange'>Get Directions</Button>
          </Link>
        </h2>
      </div>
      </div>
    </div>
  )
}

export default page