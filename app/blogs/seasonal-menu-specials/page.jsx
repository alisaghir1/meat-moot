"use client";
import React, { useMemo } from 'react';
// Removed framer-motion for immediate rendering
import { useAppContext } from '../../context';
import seasonalMenuSpecialsTrans from '../../translation/blogs/seasonalMenuSpecialsTrans';

const SeasonalMenuSpecials = () => {
  const [languege] = useAppContext();

  const data = seasonalMenuSpecialsTrans[languege] || seasonalMenuSpecialsTrans.en;

  // Transform flat content into blocks, grouping consecutive bullet paragraphs into lists
  const blocks = useMemo(() => {
    const src = data.content || [];
    const out = [];
    let listBuffer = [];
    const flush = () => {
      if (listBuffer.length) {
        out.push({ type: 'list', items: listBuffer });
        listBuffer = [];
      }
    };
    src.forEach(entry => {
      if (entry.type === 'paragraph' && entry.text.trim().startsWith('•')) {
        listBuffer.push(entry.text.replace(/^•\s*/, ''));
      } else {
        flush();
        out.push(entry);
      }
    });
    flush();
    return out;
  }, [data]);

  return (
    <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20 relative mt-32 pb-20 text-white">
      {/* Header Section */}
  <div className="flex flex-col items-center justify-center mb-10">
        <h1 className="text-orange font-bold text-4xl md:text-5xl leading-tight mb-6">
          {data.title}
        </h1>
        <div className="h-1 w-24 bg-orange rounded-full" />
  </div>

      {/* Blog Image */}
      <div className="mb-12">
        <img
          src="/blogs/blog2-2.jpg"
          alt={data.title}
          className="w-full h-80 md:h-96 object-cover rounded-xl shadow-lg border border-white/10"
        />
  </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto blog-content">
        {blocks.map((item, index) => {
          if (item.type === 'heading') {
            return (
              <h2
                key={index}
                className="text-orange font-semibold text-2xl md:text-3xl mt-12 mb-5 tracking-tight"
              >
                {item.text}
              </h2>
            );
          }
          if (item.type === 'paragraph') {
            return (
              <p key={index} className="mb-6 text-[18px] md:text-[20px] leading-8 text-white">
                {item.text}
              </p>
            );
          }
            // Custom list block
          if (item.type === 'list') {
            return (
              <ul key={index} className="list-disc list-outside pl-6 mb-8 space-y-2 text-white">
                {item.items.map((li, i) => (
                  <li key={i} className="marker:text-orange text-white">{li}</li>
                ))}
              </ul>
            );
          }
          return null;
        })}
  </div>

      {/* Additional Images */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <div>
          <img
            src="/blogs/blog3-2.jpg"
            alt="Seasonal 1"
    className="w-full h-60 md:h-64 object-cover rounded-lg shadow-lg border border-white/10"
          />
        </div>
        <div>
          <img
            src="/blogs/blog4-2.jpg"
            alt="Seasonal 2"
    className="w-full h-60 md:h-64 object-cover rounded-lg shadow-lg border border-white/10"
          />
        </div>
        <div>
          <img
            src="/blogs/blog5-2.jpg"
            alt="Seasonal 3"
    className="w-full h-60 md:h-64 object-cover rounded-lg shadow-lg border border-white/10"
          />
        </div>
      </div>
    </div>
  );
};

export default SeasonalMenuSpecials;
