'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { SlCalender } from "react-icons/sl";
import { useRouter } from 'next/navigation';

const news = [
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
  {
    id: 3,
    title: 'The Future of Politics in 2024',
    content: `
      Exploring the trends shaping the political landscape as we move into 2024.
      This article delves into the impact of technology and societal shifts on politics.
    `,
    image: '/contact.jpg',
    date: ['28/2/2024'],
  },
  {
    id: 4,
    title: 'The Future of Politics in 2024',
    content: `
      Exploring the trends shaping the political landscape as we move into 2024.
      This article delves into the impact of technology and societal shifts on politics.
    `,
    image: '/contact.jpg',
    date: ['28/2/2024'],
  },
  {
    id: 5,
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
  const router = useRouter();

  const handleNewsClick = (item) => {
    const query = new URLSearchParams(item).toString();
    router.push(`/single-news?${query}`); // Navigate with query params
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16 relative mt-32">
      {/* Header Section */}
      <motion.div 
         variants={fadeIn('down' , 0.8)}
         initial='hidden'
         whileInView={'show'}
         viewport={{once:false, amount:0.4}}
      className="flex flex-col items-center justify-center mb-10 ">
        <h2 className="text-orange font-bold text-center text-3xl">
        Latest News and Updates
        </h2>
        <p className="text-white font-light text-center text-lg mt-2">
        Keep up with the world around you by reading the most current and breaking news stories. Our news section covers global events, tech trends, and much more.
        </p>
      </motion.div>

      {/* Blog Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {news.map((item) => (
          <motion.div
            variants={fadeIn('left', 0.6)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once:false, amount:0.4}} 
            key={item.id}
            className="bg-black-heavy text-white rounded-lg overflow-hidden shadow-lg"
          >
            <div
              onClick={() => handleBlogsclick(item)}
              className="bg-cover bg-center h-64 transform transition-all hover:scale-105 cursor-pointer"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
              title={item.title}
            ></div>
            <div className="p-5">
              <h1 className="text-white font-bold text-2xl mb-3">{item.title}</h1>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Page;