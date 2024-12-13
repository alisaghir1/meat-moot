'use client'
import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { FaLongArrowAltDown } from "react-icons/fa";
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';



const jbr = [
  { image: '/al-qana/aq1.jpg' },
  { image: '/al-qana/aq2.jpg' },
  { image: '/al-qana/aq3.jpg' },
  { image: '/al-qana/aq4.jpg' },
  { image: '/al-qana/aq5.jpg' },
  { image: '/al-qana/aq6.jpg' },
  { image: '/al-qana/aq7.jpg' },
  { image: '/al-qana/aq8.jpg' },

];

const page = () => {
  return (
    <div className='mt-20 px-5 xl:px-10'>
      <div className='flex flex-col justify-center text-center items-center'>
      <h2 className='text-orange mt-20 mb-10'>
      Meat Moot Al-Qana, Abu Dhabi Branch
      </h2>
      <p className='text-white'>
      Nestled in the scenic Al-Qana district of Abu Dhabi, Meat Moot offers an extraordinary dining experience that combines the finest smoked meats with a picturesque waterfront view. Whether you&apos;re savoring our signature dishes or enjoying a relaxed meal by the water, our Al-Qana branch provides a unique atmosphere for all occasions. From casual gatherings to special celebrations, indulge in the ultimate flavor experience surrounded by the beauty of Abu Dhabi&apos;s waterfront. Join us at Meat Moot Al-Qana for a dining experience like no other!.
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
        Let&apos;s Meat At Al-QANA!
        </h2>
        <FaLongArrowAltDown className='text-4xl' />
        <h2 className='underline'>
          <Link target='_blank' href={'https://maps.app.goo.gl/b27RxKsU4tMEMdraA'}>
          <Button variant='orange'>Get Directions</Button>
          </Link>
        </h2>
      </div>
      </div>
    </div>
  )
}

export default page