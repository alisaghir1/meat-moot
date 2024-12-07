'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { SlCalender } from "react-icons/sl";

const blogs = [
  {
    id: 1,
    title: 'Meet Moot Event',
    content: `
      Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text
      ever since the 1500s, when an unknown printer took a galley of
      type and scrambled it to make a type specimen book. It has
      survived not only five centuries, but also the leap into
      electronic typesetting, remaining essentially unchanged.
    `,
    image: '/contact.jpg',
    date: ['28/2/2024'],    
  },
  {
    id: 2,
    title: 'The Future of Politics in 2024',
    content: `
      Exploring the trends shaping the political landscape as we move into 2024.
      This article delves into the impact of technology and societal shifts on politics.
    `,
    image: '/contact.jpg',
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
        Explore Our Blogs
        </h2>
        <p className="text-white font-light text-center">
        Stay up to date with the latest insights, trends, and stories in various industries. 
        Our blogs offer expert opinions and in-depth analysis on a wide range of topics.
        </p>
      </motion.div>

      {/* Displaying Blogs */}
      {blogs.map((item) => (
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
