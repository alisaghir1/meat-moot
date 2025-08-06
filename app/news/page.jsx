'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context'; // Ensure you have the language context imported
import newsTrans from '../translation/news/newsTrans'; // Import the translation file

const News = () => {
  const router = useRouter();
  const [languege] = useAppContext(); // Get the selected language from the context

  const news = [
    {
      id: 1,
      title: newsTrans[languege].news[0].translatedTitle,
      slug: 'meat-moot-global-success',
      image: '/news/news3-3.jpg'
    },
    {
      id: 2,
      title: newsTrans[languege].news[1].translatedTitle,
      slug: 'dubai-hills-opening',
      image: '/news/news1-1.webp'
    },
    {
      id: 3,
      title: newsTrans[languege].news[2].translatedTitle,
      slug: 'jbr-branch-opening',
      image: '/news/news3-2.webp'
    },
    {
      id: 4,
      title: newsTrans[languege].news[3].translatedTitle,
      slug: 'immersive-experience',
      image: '/news/news2-1.webp'
    },
    {
      id: 5,
      title: newsTrans[languege].news[4].translatedTitle,
      slug: 'ertugrul-cast-visit',
      image: '/news/news3-5.jpg'
    },
    {
      id: 6,
      title: newsTrans[languege].news[5].translatedTitle,
      slug: 'arab-stars-visit',
      image: '/celeb1.webp'
    },
    {
      id: 7,
      title: newsTrans[languege].news[6].translatedTitle,
      slug: 'dubai-grand-opening',
      image: '/news/news6-5.jpg'
    }
  ];

  const handleNewsClick = (slug) => {
    router.push(`/news/${slug}`);
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
          {newsTrans[languege].headerTitle}
        </h2>
        <p className="text-white font-light text-center text-lg mt-2">
          {newsTrans[languege].headerDescription}
        </p>
      </motion.div>

      {/* News Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {news.map((item) => (
          <motion.div
            variants={fadeIn('left', 0.6)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.4 }} 
            key={item.id}
            className="bg-black-heavy text-white rounded-lg overflow-hidden shadow-lg"
          >
            <div
              onClick={() => handleNewsClick(item.slug)}
              className="bg-cover bg-center h-64 transform transition-all hover:scale-105 cursor-pointer"
              style={{
                backgroundImage: `url(${item.image})`,
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

export default News;