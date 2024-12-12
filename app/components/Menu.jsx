'use client'
import Image from "next/image"
import {motion} from 'framer-motion'
import { fadeIn } from "@/variants"

const menu = [
    {
        img:'/menu/lambShanks.webp',
        title:'Lamb Shank',
        price:'436.5',
        description:'The finest, and tastiest smoked shanks.it comes with 8 sauces, 6 Salads and beverage of your choice.'
    },
    {
        img:'/menu/lambNeck.webp',
        title:'Lamb Neck',
        price:'436.5',
        description:'A classic smoked neck meat. it comes with 8 sauces, 6 Salads and beverage of your choice.'
    },
    {
        img:'/menu/lambShoulder.webp',
        title:'Lamb Shoulder',
        price:'436.5',
        description:'An authentic smoked meat. it comes with 8 sauces, 6 Salads and beverage of your choice.'
    },
    {
        img:'/menu/meat1.webp',
        title:'Lamb Ribs',
        price:'436.5',
        description:'The finest smoked lamb ribs. it comes with 8 sauces, 6 Salads and beverage of your choice.'

    },
    {
        img:'/menu/lambShanks.webp',
        title:'Beef Ribs',
        price:'436.5',
        description:'Juicy and flavorful ribs. it comes with 8 sauces, 6 Salads and beverage of your choice.'
    },
    {
        img:'/menu/beefBrisket.webp',
        title:'Beef Brisket',
        price:'436.5',
        description:'Tender Smoked Brisket. it comes with 8 sauces, 6 Salads and beverage of your choice.'
    },
    {
        img:'/menu/meat1.webp',
        title:'Beef Shank',
        price:'436.5',
        description:'Tender Smoked Shank. it comes with 8 sauces, 6 Salads and beverage of your choice.'
    },
]

const Menu = () => {
  return (
    <section className="bg-black relative py-12 xl:py-24 " id="menu">
        <div className="container mx-auto ">
            <motion.div
               variants={fadeIn('left' , 0.6)}
               initial='hidden'
               whileInView={'show'}
               viewport={{once:false, amount:0.4}} 
            className="mb-3 max-w-[1000px] mx-auto text-center xl:text-left ">
                <h2 className="text-orange-300 mt-2">Our Menu Concept</h2>
                <h3 className="text-white mt-2 mb-10">What distinguishes our menu and the concept behind it are the modern interpretations of familiar dishes and flavor combinations they create, resulting in unique tastes, innovative presentations, and a distinctive Quality Meats style.</h3>
            </motion.div>

            <motion.div 
            variants={fadeIn('right' , 0.6)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once:false, amount:0}}
            className="grid grid-cols-1 gap-[30px] md:grid-cols-3 md:gap-[15px] xl:grid-cols-4">
                {menu.map((item, index) => {
                    return (<div key={index} className="max-w-[270px] bg-black-heavy shadow-primary mx-auto xl:mx-0 group">
                        <div className="overflow-hidden">
                            <Image width={270} height={270} className="group-hover:scale-110 object-cover transition-all duration-300 h-64" src={item.img}  alt={`menu image ${index}`} />
                        </div>
                        <div className="bg-black-heavy pt-[20px] pb-[28px] px-[30px]">
                            <h3 className="text-white mb-[14px]">
                                {item.title}
                            </h3>
                            <div className="text-md text-gray-400 font-semibold mb-[14px]">
                                {item.description}
                            </div>
                            <div className="text-sm text-orange font-semibold">
                                AED {item.price}/KG (excl.VAT)
                            </div>
                        </div>
                    </div>)
                })}
            </motion.div>
        </div>
    </section>
  )
}

export default Menu