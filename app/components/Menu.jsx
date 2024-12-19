"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import menuTrans from "../translation/menuTrans.js"; // Import the translation object
import { useAppContext } from "../context";
import heroTrans from "../translation/heroTrans.js";

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
      img: "/menu/lambRibs.webp",
      key: "lambRibs",
    },
    {
      img: "/menu/beefRibs.webp",
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
          className={`mb-5 max-w-[2000px] mx-auto ${
            languege === "ar" ? "xl:text-right" : "text-center"
          } xl:text-left`}
        >
          <div>
            <h2 className="text-orange mt-2">
              {menuTrans[languege].conceptTitle}
            </h2>
            <p className="text-white">{menuTrans[languege].conceptDescription}</p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-5">
          {menu.map((item, index) => {
            const translatedItem = menuTrans[languege][item.key];
            return (
              <motion.div
                variants={fadeIn("left", 0.6)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0 }}
                key={index}
                className="flex flex-col xl:flex-row shadow-primary mx-auto xl:mx-0 group mt-5"
              >
                <div
                  className="relative overflow-hidden w-full xl:w-96 h-80"
                  style={{ flexShrink: 0 }}
                >
                  <Image
                    src={item.img}
                    alt={`menu image ${index}`}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-all duration-300"
                  />
                </div>
                <div className="bg-black-heavy flex flex-col justify-between pt-[20px] pb-[28px] px-[30px]">
                  <h3 className="text-orange text-2xl mb-[14px]">
                    {translatedItem.title}
                  </h3>
                  <div className="text-xl text-gray-400 font-semibold mb-[14px]">
                    {translatedItem.description}
                  </div>
                  <div className="text-md text-white font-semibold">
                    {translatedItem.price}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.p
          variants={fadeIn("down", 0.8)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.4 }}
          className="mb-7 text-xl xl:text-2xl text-orange font-base mt-10 text-center"
        >
          {heroTrans[languege].description}
        </motion.p>
      </div>
    </section>
  );
};

export default Menu;
