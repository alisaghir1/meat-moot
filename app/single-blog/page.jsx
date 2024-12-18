'use client';
import React, { useEffect, useState, Suspense } from 'react'; // Import Suspense
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { SlCalender } from "react-icons/sl";
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState({ title: '', content: '', image: '', date: [] });

  useEffect(() => {
    const title = searchParams.get('title');
    const content = searchParams.get('content');
    const image = searchParams.get('image');
    const date = searchParams.get('date')?.split(',') || [];

    if (title && content && image) {
      setData({ title, content, image, date });
    }
  }, [searchParams]); // Depend on searchParams to trigger re-run when the URL changes

  if (!data.title) {
    return <p>Loading...</p>; // Handle the case where the data is not yet loaded
  }

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative mt-32">
      <motion.div
        variants={fadeIn('left', 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }}
        className="mb-16"
      >
        {/* Background Image */}
        <div
          className="bg-cover bg-center text-center overflow-hidden"
          style={{
            minHeight: '500px',
            backgroundImage: `url(${data.image})`,
          }}
          title={data.title}
        ></div>

        {/* Content Section */}
        <div className="max-w-3xl mx-auto">
          <div className="mt-3 bg-black-heavy rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="bg-black-heavy relative top-0 -mt-32 p-5 sm:p-10">
              {/* Title */}
              <h1 className="text-orange font-bold text-3xl mb-2">{data.title}</h1>

              {/* Content */}
              <p className="text-base text-white leading-8 my-5">{data.content}</p>

              {/* Dates */}
              {data.date.length > 0 && (
                <div className="space-x-2 flex">
                  {data.date.map((d, index) => (
                    <p
                      key={index}
                      className="text-xs flex items-center justify-center gap-2 text-orange font-medium hover:text-white cursor-pointer transition duration-500 ease-in-out"
                    >
                      <SlCalender /> {d}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Wrap the component in Suspense
const PageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Page />
  </Suspense>
);

export default PageWithSuspense;
