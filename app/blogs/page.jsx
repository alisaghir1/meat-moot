'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppContext } from '../context'; 
import blogsTrans from '../translation/blogs/blogsMainTrans';

const Blogs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    },
    {
      id: 6,
      title: blogsTrans[languege].blogs[5].translatedTitle,
      slug: 'beef-cuts-guide',
      image: '/blogs/blog1-3.jpg'
    },
    {
      id: 7,
      title: blogsTrans[languege].blogs[6].translatedTitle,
      slug: 'seasonal-menu-specials',
      image: '/blogs/blog1-2.jpg'
    }
    ,{
      id: 8,
      title: blogsTrans[languege].blogs[7].translatedTitle,
      slug: 'secret-sauces',
      image: '/blogs/blog2-3.jpg'
    }
    ,{
      id: 9,
      title: blogsTrans[languege].blogs[8].translatedTitle,
      slug: 'meat-myths-busted',
      image: '/blogs/blog3-2.jpg'
    }
    ,{
      id: 10,
      title: blogsTrans[languege].blogs[9].translatedTitle,
      slug: 'food-and-friendship',
      image: '/blogs/blog4-2.jpg'
    }
  ];

  const handleBlogClick = (slug) => {
    router.push(`/blogs/${slug}`);
  };

  // Pagination logic
  const pageSize = 8;
  const filtered = blogs.filter(Boolean);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  let currentPage = parseInt(searchParams.get('page') || '1', 10);
  if (isNaN(currentPage) || currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;
  const startIndex = (currentPage - 1) * pageSize;
  const visibleBlogs = filtered.slice(startIndex, startIndex + pageSize);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    const qp = new URLSearchParams(Array.from(searchParams.entries()));
    qp.set('page', String(p));
    router.push(`/blogs?${qp.toString()}`);
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
        {visibleBlogs.map((item) => (
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

export default Blogs;