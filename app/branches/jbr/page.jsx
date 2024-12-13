'use client'
import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { FaLongArrowAltDown } from "react-icons/fa";
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';



const jbr = [
  { image: '/jbr/jb1.jpg' },
  { image: '/jbr/jb2.jpg' },
  { image: '/jbr/jb3.jpg' },
  { image: '/jbr/jb4.jpg' },
  { image: '/jbr/jb5.jpg' },
  { image: '/jbr/jb6.jpg' },
  { image: '/jbr/jb7.jpg' },
  { image: '/jbr/jb8.jpg' },

];

const page = () => {
  return (
    <div className='mt-20 px-5 xl:px-10'>
      <div className='flex flex-col justify-center text-center items-center'>
      <h2 className='text-orange mt-20 mbp-10'>
      Meat Moot JBR Branch
      </h2>
      <p className='text-white'>
      Experience the ultimate in smoked meat dining at our JBR branch! Located in the heart of Dubai&apos;s vibrant Jumeirah Beach Residence, our restaurant offers a perfect blend of mouthwatering smoked delicacies, a warm and welcoming atmosphere, and stunning views of the city&apos;s iconic coastline. Whether you&apos;re here for a casual meal or a special occasion, Meat Moot JBR promises an unforgettable culinary experience. Indulge in the best flavors, relax in style, and let us take your dining to the next level.
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
        Let&apos;s Meat At JBR!
        </h2>
        <FaLongArrowAltDown className='text-4xl' />
        <h2 className='underline'>
          <Link target='_blank' href={'https://maps.app.goo.gl/F65xWMAg8dSQcAAu7'}>
          <Button variant='orange'>Get Directions</Button>
          </Link>
        </h2>
      </div>
      </div>
    </div>
  )
}

export default page