'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { SlCalender } from "react-icons/sl";

const news = [
  {
    id: 1,
    title: 'Breaking News: Tech Revolution',
    content: `
      The tech world is undergoing a massive transformation as AI continues to evolve,
      shaping industries in unprecedented ways.
    `,
    image: '/about.jpg',
    date: ['28/2/2024'],
  },
  {
    id: 2,
    title: 'Global Economy Insights',
    content: `
      Experts predict significant shifts in the global economy as countries adapt to new
      challenges in the post-pandemic era.
    `,
    image: '/about.jpg',
    date: ['28/2/2024'],
  },
];

const Page = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative mt-32">
      {/* Header Section */}
      <motion.div 
         variants={fadeIn('down' , 0.8)}
         initial='hidden'
         whileInView={'show'}
         viewport={{once:false, amount:0.4}}
      className="flex flex-col items-center justify-center mb-10">
        <h2 className="text-orange font-bold text-center">
          Latest News and Updates
        </h2>
        <p className="text-white font-light text-center">
          Keep up with the world around you by reading the most current and breaking news stories. Our news section covers global events, tech trends, and much more.
        </p>
      </motion.div>

      {/* Dynamic Content Rendering for News */}
      {news.map((item) => (
        <motion.div
        variants={fadeIn('left' , 1)}
         initial='hidden'
         whileInView={'show'}
         viewport={{once:false, amount:0.4}} 
         key={item.id} className="mb-16">
          <div
            className="bg-cover bg-center text-center overflow-hidden"
            style={{
              minHeight: '500px',
              backgroundImage: `url(${item.image})`,
            }}
            title={item.title}
          ></div>
          <div className="max-w-3xl mx-auto">
            <div className="mt-3 bg-black-heavy rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
              <div className="bg-black-heavy relative top-0 -mt-32 p-5 sm:p-10">
                <h1 className="text-orange font-bold text-3xl mb-2">{item.title}</h1>
                <p className="text-base text-white leading-8 my-5">{item.content}</p>

                <div className="space-x-2 flex">
                  {item.date.map((date, index) => (
                    <p
                      key={index}
                      className="text-xs flex items-center justify-center gap-2 text-orange font-medium hover:text-white cursor-pointer transition duration-500 ease-in-out"
                    >
                      <SlCalender /> {date}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Page;
