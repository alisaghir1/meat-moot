'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppContext } from '../context'; // Ensure you have the language context imported
import newsTrans from '../translation/news/newsTrans'; // Import the translation file

const News = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    },
    {
      id: 8,
      title: newsTrans[languege] && newsTrans[languege].news[7] ? newsTrans[languege].news[7].translatedTitle : 
            (languege === 'ar' ? 'ميت موت يحتفل بالافتتاح الكبير لفرع العين' : 
             languege === 'ru' ? 'Мит Мут празднует торжественное открытие филиала в Аль-Айне' : 
             'Meat Moot Celebrates Grand Opening of Al Ain Branch'),
      slug: 'al-ain-grand-opening',
      image: '/news/news7-1.jpg'
    }
  ];

  const handleNewsClick = (slug) => {
    router.push(`/news/${slug}`);
  };

  // Pagination and ordering (newest first like blogs)
  const pageSize = 8;
  const filtered = news.filter(Boolean);
  const ordered = filtered.slice().reverse();
  const totalPages = Math.max(1, Math.ceil(ordered.length / pageSize));
  let currentPage = parseInt(searchParams.get('page') || '1', 10);
  if (isNaN(currentPage) || currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;
  const startIndex = (currentPage - 1) * pageSize;
  const visibleNews = ordered.slice(startIndex, startIndex + pageSize);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    const qp = new URLSearchParams(Array.from(searchParams.entries()));
    qp.set('page', String(p));
    router.push(`/news?${qp.toString()}`);
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
        {visibleNews.map((item) => (
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

      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded border text-sm transition ${currentPage === 1 ? 'opacity-40 cursor-not-allowed border-white/20 text-white/50' : 'hover:bg-orange hover:text-black border-white/40 text-white'}`}
            aria-label="Previous page"
          >
            ◀
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`w-10 h-10 rounded-full text-sm font-medium transition border ${p === currentPage ? 'bg-orange text-black border-orange' : 'border-white/30 text-white hover:bg-white/10'}`}
              aria-current={p === currentPage ? 'page' : undefined}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded border text-sm transition ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed border-white/20 text-white/50' : 'hover:bg-orange hover:text-black border-white/40 text-white'}`}
            aria-label="Next page"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default News;