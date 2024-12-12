'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context'; // Ensure you have the language context imported
import newsTrans from '../translation/newsTrans'; // Import the translation file

const news = [
  {
    id: 2,
    title: 'Introducing Lamb Shoulder: A New Favorite',
    content: `
      Our new lamb shoulder dish is here to satisfy your cravings! Slow-cooked to perfection with aromatic spices and a rich, smoky flavor. A must-try for meat lovers.
    `,
    image: '/menu/lambShoulder.webp',
    date: ['28/2/2024'],
  },
  {
    id: 3,
    title: 'Lamb Neck: The Tender Cut You Need to Try',
    content: `
      Our lamb neck is braised to perfection, delivering a melt-in-your-mouth experience. Tender, juicy, and packed with flavor—it's the perfect addition to our menu.
    `,
    image: '/menu/lambNeck.webp',
    date: ['28/2/2024'],
  },
  {
    id: 4,
    title: 'Beef Ribs: Fall-Off-The-Bone Goodness',
    content: `
      Our new beef ribs are slow-cooked to tender perfection, served with our signature smoky glaze. Perfect for those who love bold, savory flavors.
    `,
    image: '/menu/beefRibs.webp',
    date: ['28/2/2024'],
  },
  {
    id: 5,
    title: 'Beef Brisket: A Smoked Masterpiece',
    content: `
      Our smoked beef brisket is the highlight of our menu. Carefully smoked over hours to achieve the perfect balance of smokiness and tenderness. It's a dish that speaks for itself.
    `,
    image: '/menu/beefBrisket.webp',
    date: ['28/2/2024'],
  },
];

const News = () => {
  const router = useRouter();
  const [languege] = useAppContext(); // Get the selected language from the context

  const handleNewsClick = (item) => {
    // Get the translated title and content based on the selected language
    const translatedTitle = newsTrans[languege].news.find(news => news.title === item.title)?.translatedTitle || item.title;
    const translatedContent = newsTrans[languege].news.find(news => news.title === item.title)?.content || item.content;
    
    // Add the translated title and content to query params
    const query = new URLSearchParams({ ...item, title: translatedTitle, content: translatedContent }).toString();
    router.push(`/single-news?${query}`); // Navigate with query params
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
              onClick={() => handleNewsClick(item)}
              className="bg-cover bg-center h-64 transform transition-all hover:scale-105 cursor-pointer"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
              title={item.title}
            ></div>
            <div className="p-5">
              <h1 className="text-white font-bold text-2xl mb-3">
                {
                  newsTrans[languege].news.find(newsItem => newsItem.title === item.title)?.translatedTitle || item.title
                }
              </h1>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default News;
