"use client";
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context";
import blogTrans from "../translation/blogTrans"; // Import the translation file

const blogs = [
  {
    id: 1,
    title: "The Art of Smoking Meat at Meat Moot",
    content: `
      At Meat Moot, we believe in perfecting the craft of smoked meat. Our slow-smoking process, combined with high-quality cuts, delivers a unique flavor that keeps our guests coming back for more. Discover the secrets behind our signature smoked brisket and ribs.
    `,
    image: "/contact.jpg",
    date: ["28/2/2024"],
  },
  {
    id: 2,
    title: "The perfect meat",
    content: `
      Wine and meat are a timeless combination. In this blog, we explore cuts of meat, helping you elevate your dining experience. Learn how to pair our signature dishes with the perfect meat.
    `,
    image: "/reservation.jpg",
    date: ["28/2/2024"],
  },
  {
    id: 3,
    title: "The Rise of Plant-Based Menus in Restaurants",
    content: `
      As more people embrace plant-based diets, restaurants are responding with creative, flavorful dishes. In this blog, we take a look at the rise of plant-based menus and how they’re transforming the restaurant industry, offering something for everyone.
    `,
    image: "/smallBg3.jpg",
    date: ["28/2/2024"],
  },
  {
    id: 4,
    title: "Why Every Chef Needs a Signature Dish",
    content: `
      A signature dish is a reflection of a chef’s creativity and expertise. At Meat Moot, our chefs have crafted unique dishes that define our restaurant. In this post, we dive into the importance of a signature dish and why it matters to the identity of a restaurant.
    `,
    image: "/smallBg.jpg",
    date: ["28/2/2024"],
  }
];

const Blogs = () => {
  const router = useRouter();
  const [languege] = useAppContext(); // Get the language context

  const handleBlogsclick = (item) => {
    // Get the translated title and content based on the selected language
    const translatedTitle = blogTrans[languege].blogs.find(blog => blog.title === item.title)?.translatedTitle || item.title;
    const translatedContent = blogTrans[languege].blogs.find(blog => blog.title === item.title)?.content || item.content;
    
    // Add the translated title and content to query params
    const query = new URLSearchParams({ ...item, title: translatedTitle, content: translatedContent }).toString();
    router.push(`/single-blog?${query}`); // Navigate with query params
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16 relative mt-32">
      {/* Header Section */}
      <motion.div
        variants={fadeIn("down", 0.8)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.4 }}
        className="flex flex-col items-center justify-center mb-10"
      >
        <h2 className="text-orange font-bold text-center text-3xl">
          {blogTrans[languege].headerTitle}
        </h2>
        <p className="text-white font-light text-center text-lg mt-2">
          {blogTrans[languege].headerDescription}
        </p>
      </motion.div>

      {/* Blog Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {blogs.map((item) => (
          <motion.div
            variants={fadeIn("left", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.4 }}
            key={item.id}
            className="bg-black-heavy text-white rounded-lg overflow-hidden shadow-lg"
          >
            <div
              onClick={() => handleBlogsclick(item)}
              className="bg-cover bg-center h-64 transform transition-all hover:scale-105 cursor-pointer"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
              title={item.title}
            ></div>
            <div className="p-5">
              <h1 className="text-white font-bold text-2xl mb-3">
                {
                  blogTrans[languege].blogs.find(blog => blog.title === item.title)?.translatedTitle || item.title
                }
              </h1>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
