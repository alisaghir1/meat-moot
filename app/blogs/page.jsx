'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context'; // Ensure you have the language context imported
import blogsTrans from '../translation/blogTrans.js'; // Import the translation file

const Blogs = () => {
  const router = useRouter();
  const [languege] = useAppContext(); // Get the selected language from the context

  const blogs = [
    {
      id: 1,
      title: blogsTrans[languege].blogs[0].translatedTitle, // Translated Title
      content: [
        {
          title: blogsTrans[languege].blogs[0].content[0].translatedTitle,
          images: ['/blogs/blog1-1.jpg'],
          text: blogsTrans[languege].blogs[0].content[0].text
        },
        {
          title: blogsTrans[languege].blogs[0].content[1].translatedTitle,
          images: ['/blogs/blog1-2.jpg'],
          text: blogsTrans[languege].blogs[0].content[1].text
        },
        {
          title: blogsTrans[languege].blogs[0].content[2].translatedTitle,
          images: ['/blogs/blog1-3.jpg'],
          text: blogsTrans[languege].blogs[0].content[2].text
        },
        {
          title: blogsTrans[languege].blogs[0].content[3].translatedTitle,
          images: ['/blogs/blog1-4.jpg'],
          text: blogsTrans[languege].blogs[0].content[3].text
        }
      ]
    },
    {
      id: 2,
      title: blogsTrans[languege].blogs[1].translatedTitle,
      content: [
        {
          title: blogsTrans[languege].blogs[1].content[0].translatedTitle,
          images: ['/blogs/blog2-1.jpg'],
          text: blogsTrans[languege].blogs[1].content[0].text
        },
        {
          title: blogsTrans[languege].blogs[1].content[1].translatedTitle,
          images: ['/blogs/blog2-2.jpg'],
          text: blogsTrans[languege].blogs[1].content[1].text
        },
        {
          title: blogsTrans[languege].blogs[1].content[2].translatedTitle,
          images: ['/blogs/blog2-3.jpg'],
          text: blogsTrans[languege].blogs[1].content[2].text
        },
        {
          title: blogsTrans[languege].blogs[1].content[3].translatedTitle,
          images: ['/blogs/blog2-4.jpg'],
          text: blogsTrans[languege].blogs[1].content[3].text
        }
      ]
    },
    {
      id: 3,
      title: blogsTrans[languege].blogs[2].translatedTitle,
      content: [
        {
          title: blogsTrans[languege].blogs[2].content[0].translatedTitle,
          images: ['/blogs/blog3-1.jpg'],
          text: blogsTrans[languege].blogs[2].content[0].text
        },
        {
          title: blogsTrans[languege].blogs[2].content[1].translatedTitle,
          images: ['/blogs/blog3-2.jpg'],
          text: blogsTrans[languege].blogs[2].content[1].text
        },
        {
          title: blogsTrans[languege].blogs[2].content[2].translatedTitle,
          images: ['/blogs/blog3-3.jpg'],
          text: blogsTrans[languege].blogs[2].content[2].text
        },
        {
          title: blogsTrans[languege].blogs[2].content[3].translatedTitle,
          images: ['/blogs/blog4-1.jpg'],
          text: blogsTrans[languege].blogs[2].content[3].text
        },
      ]
    },
    {
      id: 4,
      title: blogsTrans[languege].blogs[3].translatedTitle,
      content: [
        {
          title: blogsTrans[languege].blogs[3].content[0].translatedTitle,
          images: ['/blogs/blog4-1.jpg'],
          text: blogsTrans[languege].blogs[3].content[0].text
        },
        {
          title: blogsTrans[languege].blogs[3].content[1].translatedTitle,
          images: ['/blogs/blog4-2.jpg'],
          text: blogsTrans[languege].blogs[3].content[1].text
        },
        {
          title: blogsTrans[languege].blogs[3].content[2].translatedTitle,
          images: ['/blogs/blog4-3.jpg'],
          text: blogsTrans[languege].blogs[3].content[2].text
        },
        {
          title: blogsTrans[languege].blogs[3].content[3].translatedTitle,
          images: ['/blogs/blog3-1.jpg'],
          text: blogsTrans[languege].blogs[3].content[3].text
        },
        {
          title: blogsTrans[languege].blogs[3].content[4].translatedTitle,
          images: ['/blogs/blog1-2.jpg'],
          text: blogsTrans[languege].blogs[3].content[4].text
        },
      ]
    },
    {
      id: 5,
      title: blogsTrans[languege].blogs[4].translatedTitle,
      content: [
        {
          title: blogsTrans[languege].blogs[4].content[0].translatedTitle,
          images: ['/blogs/blog5-1.jpg'],
          text: blogsTrans[languege].blogs[4].content[0].text
        },
        {
          title: blogsTrans[languege].blogs[4].content[1].translatedTitle,
          images: ['/blogs/blog5-2.jpg'],
          text: blogsTrans[languege].blogs[4].content[1].text
        },
        {
          title: blogsTrans[languege].blogs[4].content[2].translatedTitle,
          images: ['/blogs/blog5-3.jpg'],
          text: blogsTrans[languege].blogs[4].content[2].text
        },
        {
          title: blogsTrans[languege].blogs[4].content[3].translatedTitle,
          images: ['/blogs/blog2-4.jpg'],
          text: blogsTrans[languege].blogs[4].content[3].text
        },
        {
          title: blogsTrans[languege].blogs[4].content[4].translatedTitle,
          images: ['/blogs/blog1-1.jpg'],
          text: blogsTrans[languege].blogs[4].content[4].text
        },
        {
          title: blogsTrans[languege].blogs[4].content[5].translatedTitle,
          images: ['/blogs/blog1-4.jpg'],
          text: blogsTrans[languege].blogs[4].content[5].text
        },
      ]
    }
  ];

  const handleNewsClick = (item) => {
    // Store the item in local storage
    localStorage.setItem('selectedNews', JSON.stringify(item));
    router.push('/single-blog'); // Navigate to the single news page
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16 relative mt-32">
      {/* Header Section */}
      <motion.div 
        variants={fadeIn('down', 0.8)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.4 }}
        className="flex flex-col items-center justify-center mb-10"
      >
        <h2 className="text-orange font-bold text-center text-3xl">
          {blogsTrans[languege].headerTitle}
        </h2>
        <p className="text-white font-light text-center text-lg mt-2">
          {blogsTrans[languege].headerDescription}
        </p>
      </motion.div>

      {/* News Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {blogs.map((item) => (
          <motion.div
            variants={fadeIn('left', 0.6)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.4 }} 
            key={item.id}
            className="bg-black-heavy text-white rounded-lg overflow-hidden shadow-lg"
          >
            <div
              onClick={() => handleNewsClick(item)}
              className="bg-cover bg-center h-64 transform transition-all hover:scale-105 cursor-pointer"
              style={{
                backgroundImage: `url(${item.content[0].images[0]})`,
              }}
              title={item.title}
            ></div>
            <div className="p-5">
              <h1 className="text-white font-bold text-2xl mb-3">
                {item.title}
              </h1>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;