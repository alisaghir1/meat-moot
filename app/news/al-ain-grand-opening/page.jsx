"use client";
import React from 'react';
import Image from 'next/image';
import { useAppContext } from '../../context';
import alAinGrandOpeningTrans from '../../translation/news/alAinGrandOpeningTrans';

export default function Page() {
  const [languege] = useAppContext();
  const data = alAinGrandOpeningTrans[languege] || alAinGrandOpeningTrans.en;

  return (
    <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20 relative mt-32 pb-20 text-white">
      <div className="flex flex-col items-center justify-center mb-10">
        <h1 className="text-orange font-bold text-4xl md:text-5xl leading-tight mb-6 text-center">
          {data.title}
        </h1>
        <div className="h-1 w-24 bg-orange rounded-full" />
      </div>

      <div className="mb-12 relative w-full h-80 md:h-96 rounded-xl overflow-hidden border border-white/10 shadow-lg">
        <Image
          src="/news/news7-6.jpg"
          alt={data.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto">
        {data.content.map((item, index) => {
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
          return null;
        })}
      </div>

      {/* Photo Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <div key={num} className="relative w-full h-60 md:h-64 rounded-lg overflow-hidden border border-white/10 shadow-lg">
            <Image
              src={`/news/news7-${num}.jpg`}
              alt={`Al Ain Grand Opening Photo ${num}`}
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}