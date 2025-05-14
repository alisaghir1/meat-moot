"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import menuTrans from "../translation/menuTrans.js";
import { useAppContext } from "../context";
import heroTrans from "../translation/heroTrans.js";
import { useState } from "react";
import { Button } from "./ui/button.jsx";

const Menu = () => {
  const [languege] = useAppContext();
  const [menuType, setMenuType] = useState("meat"); // "meat" or "burgers"

  const meatMenu = [
    { img: "/menu/lambShanks.webp", key: "lambShank" },
    { img: "/menu/lambNeck.webp", key: "lambNeck" },
    { img: "/menu/lambShoulder.webp", key: "lambShoulder" },
    { img: "/menu/lambRibs.webp", key: "lambRibs" },
    { img: "/menu/beefRibs.webp", key: "beefRibs" },
    { img: "/menu/beefBrisket.webp", key: "beefBrisket" },
    { img: "/menu/meat1.webp", key: "beefShank" },
  ];

  const burgerMenu = [
    { img: "/menu/UrgeBurger.jpeg", key: "burger1" },
    { img: "/menu/DoubleUrge.jpeg", key: "burger2" },
    { img: "/menu/UrgeMushroom.jpeg", key: "burger3" },
    { img: "/menu/DoubleUrgeMushroom.jpeg", key: "burger4" },
    { img: "/menu/UrgeMaxDouble.jpeg", key: "burger5" },
    { img: "/menu/MiniUrgeKids.png", key: "burger6" },
  ];

  const menuToShow = menuType === "meat" ? meatMenu : burgerMenu;

  return (
    <section className="bg-black relative py-12 xl:py-24" id="menu">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("left", 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className={`mb-5 max-w-[2000px] mx-auto ${
            languege === "ar" ? "xl:text-right" : "text-center"
          } xl:text-left`}
        >
          <div>
            <h2 className="text-orange mt-2">
              {menuTrans[languege].conceptTitle}
            </h2>
            <p className="text-white">
              {menuTrans[languege].conceptDescription}
            </p>
          </div>
        </motion.div>

        {/* Menu Switch Buttons */}
        <div className="flex xl:justify-start justify-center gap-4 mb-8">
          <Button
            onClick={() => setMenuType("meat")}
            className={`px-6 py-2 border border-orange rounded-lg hover:bg-black-heavy hover:scale-105 transition-all duration-200 ${
              menuType === "meat"
                ? "bg-orange text-white"
                : "bg-black text-white"
            }`}
          >
            {languege === "ar" ? "لحوم" : languege === "ru" ? "Мясо" : "Meat"}
          </Button>

          <Button
            onClick={() => setMenuType("burgers")}
            className={`px-6 py-2 border border-orange rounded-lg hover:bg-black-heavy hover:scale-105 transition-all duration-200 ${
              menuType === "burgers"
                ? "bg-orange text-white"
                : "bg-black text-white"
            }`}
          >
            {languege === "ar"
              ? "أورج برجرز"
              : languege === "ru"
              ? "Урдж Бургеры"
              : "Urge Burgers"}
          </Button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-5">
          {menuToShow.map((item, index) => {
            const translatedItem = menuTrans[languege][item.key];
            const flexDirection =
              index % 2 === 0 ? "xl:flex-row" : "xl:flex-row-reverse";

            return (
              <motion.div
                variants={fadeIn("left", 0.6)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0 }}
                key={index}
                className={`flex flex-col ${flexDirection} shadow-primary mx-auto xl:mx-0 group mt-5`}
              >
                <div
                  className="relative overflow-hidden w-full xl:w-96 h-96"
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
                  <h3 className="text-orange xl:text-4xl text-2xl mb-[14px]">
                    {translatedItem.title}
                  </h3>
                  <div className="xl:text-3xl text-xl text-gray-400 font-semibold mb-[14px]">
                    {translatedItem.description}
                  </div>
<div className="xl:text-xl text-lg text-white font-semibold">
  {translatedItem.price && translatedItem.price !== "0" ? (
    <>
      {translatedItem.price}
      {translatedItem.comboPrice && (
        <>
          <span className="text-gray-500 mx-2">|</span>
          <span className="text-orange">
            {languege === "ar" ? "كومبو: " : "Combo: "}
            {translatedItem.comboPrice}
          </span>
        </>
      )}
    </>
  ) : translatedItem.comboPrice ? (
    <span className="text-orange">
      {languege === "ar" ? "كومبو : " : "Combo: "}
      {translatedItem.comboPrice}
    </span>
  ) : null}
</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          variants={fadeIn("down", 0.8)}
          initial="hidden"
          whileInView="show"
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
