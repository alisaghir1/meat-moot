'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context'; 
import blogsTrans from '../translation/blogsMainTrans';

const Blogs = () => {
  const router = useRouter();
  const [languege] = useAppContext(); 

  const blogs = [
    {
      id: 1,
      title: blogsTrans[languege].blogs[0].translatedTitle,
      slug: 'global-flavors',
      image: '/blogs/blog1-1.jpg'
    },
    {
      id: 2,
      title: blogsTrans[languege].blogs[1].translatedTitle,
      slug: 'signature-lamb-dishes',
      image: '/blogs/blog2-1.jpg'
    },
    {
      id: 3,
      title: blogsTrans[languege].blogs[2].translatedTitle,
      slug: 'lamb-cuts-guide',
      image: '/blogs/blog3-1.jpg'
    },
    {
      id: 4,
      title: blogsTrans[languege].blogs[3].translatedTitle,
      slug: 'special-occasions',
      image: '/blogs/blog4-1.jpg'
    },
    {
      id: 5,
      title: blogsTrans[languege].blogs[4].translatedTitle,
      slug: 'smoking-history',
      image: '/blogs/blog5-1.jpg'
    }
  ];

  const handleBlogClick = (slug) => {
    router.push(`/blogs/${slug}`);
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

      {/* Blogs Grid Layout */}
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
              onClick={() => handleBlogClick(item.slug)}
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

export default Blogs;