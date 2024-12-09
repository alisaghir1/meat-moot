'use client'
import Image from "next/image"
import {IoIosArrowRoundForward} from 'react-icons/io'

import {motion} from 'framer-motion'
import { fadeIn } from "@/variants"

const menu = [
    {
        img:'/menu/lambShanks.webp',
        title:'Lamb Shank',
        price:'AED 436.5(excl.VAT) / KG',
        description:'The finest, and tastiest smoked shanks.it comes with 8 sauces, 6 Salads and beverage of your choice.'
    },
    {
        img:'/menu/lambNeck.webp',
        title:'Lamb Neck',
        price:'AED 436.5(excl.VAT) / KG',
        description:'A classic smoked neck meat. it comes with 8 sauces, 6 Salads and beverage of your choice.'
    },
    {
        img:'/menu/lambShoulder.webp',
        title:'Lamb Shoulder',
        price:'AED 436.5(excl.VAT) / KG',
        description:'An authentic smoked meat. it comes with 8 sauces, 6 Salads and beverage of your choice.'
    },
    {
        img:'/menu/LambRibs.webp',
        title:'Lamb Ribs',
        price:'AED 436.5(excl.VAT) / KG',
        description:'The finest smoked lamb ribs. it comes with 8 sauces, 6 Salads and beverage of your choice.'

    },
    {
        img:'/menu/lambShanks.webp',
        title:'Beef Ribs',
        price:'AED 436.5(excl.VAT) / KG',
        description:'Juicy and flavorful ribs. it comes with 8 sauces, 6 Salads and beverage of your choice.'
    },
    {
        img:'/menu/beefBrisket.webp',
        title:'Beef Brisket',
        price:'AED 436.5(excl.VAT) / KG',
        description:'Tender Smoked Brisket. it comes with 8 sauces, 6 Salads and beverage of your choice.'
    },
    {
        img:'/menu/meat1.webp',
        title:'Beef Shank',
        price:'AED 436.5(excl.VAT) / KG',
        description:'Tender Smoked Shank. it comes with 8 sauces, 6 Salads and beverage of your choice.'
    },
]

const Menu = () => {
  return (
    <section className="bg-black relative py-12 xl:py-24 " id="menu">
        <div className="container mx-auto">
            <motion.div
               variants={fadeIn('left' , 0.6)}
               initial='hidden'
               whileInView={'show'}
               viewport={{once:false, amount:0.4}} 
            className="mb-3 max-w-[570px] mx-auto text-center xl:text-left">
                <h2 className="text-white">Our Menu</h2>
                <div className="text-orange flex justify-center xl:justify-start items-center mb-16" href={'/'}>
                <IoIosArrowRoundForward className="text-3xl"/>
                Our Premium Meat Specials
                </div>
            </motion.div>

            <motion.div 
            variants={fadeIn('right' , 0.6)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once:false, amount:0}}
            className="grid grid-cols-1 gap-[30px] md:grid-cols-3 md:gap-[15px] xl:grid-cols-4">
                {menu.map((item, index) => {
                    return (<div key={index} className="max-w-[270px] bg-white shadow-primary mx-auto xl:mx-0 group">
                        <div className="overflow-hidden">
                            <Image className="group-hover:scale-110 object-cover transition-all duration-300 h-56 w-72" src={item.img} width={270} height={270} alt={`menu image ${index}`} />
                        </div>
                        <div className="bg-black-heavy pt-[20px] pb-[28px] px-[30px]">
                            <h3 className="text-white mb-[14px]">
                                {item.title}
                            </h3>
                            <div className="text-sm text-gray-400 font-semibold mb-[14px]">
                                {item.description}
                            </div>
                            <div className="text-sm text-orange font-semibold">
                                {item.price}
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