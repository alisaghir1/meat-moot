'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { SlCalender } from "react-icons/sl";

// Single Blog Data
const blogs = {
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
};

const Page = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative mt-32">
      <motion.div
        variants={fadeIn('left', 1)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.4 }}
        key={blogs.id} className="mb-16"
      >
        <div
          className="bg-cover bg-center text-center overflow-hidden"
          style={{
            minHeight: '500px',
            backgroundImage: `url(${blogs.image})`,
          }}
          title={blogs.title}
        ></div>
        <div className="max-w-3xl mx-auto">
          <div className="mt-3 bg-black-heavy rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="bg-black-heavy relative top-0 -mt-32 p-5 sm:p-10">
              <h1 className="text-orange font-bold text-3xl mb-2">{blogs.title}</h1>
              <p className="text-base text-white leading-8 my-5">{blogs.content}</p>

              <div className="space-x-2 flex">
                {blogs.date.map((date, index) => (
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
    </div>
  );
};

export default Page;
