"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import menuTrans from "../translation/menuTrans.js"; // Import the translation object
import { useAppContext } from "../context";

const Menu = () => {
  const [languege] = useAppContext();

  const menu = [
    {
      img: "/menu/lambShanks.webp",
      key: "lambShank",
    },
    {
      img: "/menu/lambNeck.webp",
      key: "lambNeck",
    },
    {
      img: "/menu/lambShoulder.webp",
      key: "lambShoulder",
    },
    {
      img: "/menu/meat1.webp",
      key: "lambRibs",
    },
    {
      img: "/menu/lambShanks.webp",
      key: "beefRibs",
    },
    {
      img: "/menu/beefBrisket.webp",
      key: "beefBrisket",
    },
    {
      img: "/menu/meat1.webp",
      key: "beefShank",
    },
  ];

  return (
    <section className="bg-black relative py-12 xl:py-24 " id="menu">
      <div className="container mx-auto ">
        <motion.div
          variants={fadeIn("left", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.4 }}
          className="mb-3 max-w-[1000px] mx-auto text-center xl:text-left "
        >
          <h2 className="text-orange-300 mt-2">Our Menu Concept</h2>
          <h3 className="text-white mt-2 mb-10">
            {menuTrans[languege].menuDescription}
          </h3>
        </motion.div>

        <motion.div
          variants={fadeIn("right", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0 }}
          className="grid grid-cols-1 gap-[30px] md:grid-cols-3 md:gap-[15px] xl:grid-cols-4"
        >
          {menu.map((item, index) => {
            const translatedItem = menuTrans[languege][item.key];
            return (
              <div
                key={index}
                className="max-w-[270px] bg-black-heavy shadow-primary mx-auto xl:mx-0 group"
              >
                <div className="overflow-hidden">
                  <Image
                    width={270}
                    height={270}
                    className="group-hover:scale-110 object-cover transition-all duration-300 h-64"
                    src={item.img}
                    alt={`menu image ${index}`}
                  />
                </div>
                <div className="bg-black-heavy pt-[20px] pb-[28px] px-[30px]">
                  <h3 className="text-white mb-[14px]">
                    {translatedItem.title}
                  </h3>
                  <div className="text-md text-gray-400 font-semibold mb-[14px]">
                    {translatedItem.description}
                  </div>
                  <div className="text-sm text-orange font-semibold">
                    {translatedItem.price}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;
