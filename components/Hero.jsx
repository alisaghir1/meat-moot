'use client'
import Image from "next/image"
import {motion} from 'framer-motion'
import { Button } from "./ui/button"
import { fadeIn } from "@/variants"
import {Link as ScrollLink} from 'react-scroll'

const Hero = () => {
  return (
    <section id="home" className="bg-hero2 xl:bg-hero bg-no-repeat relative xl:bg-cover xl:h-[1098px] py-40 pb-32 xl:py-0">
        <div className="container mx-auto">

            <div className="flex items-center xl:h-[960px]">

                <div className="w-full xl:max-w-[460px] text-center xl:text-left">
                    <motion.h1
                    variants={fadeIn('down' , 0.6)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once:false, amount:0.4}}
                     className="text-white mb-7 ">
                       A Taste Of<br /> Our Meat
                    </motion.h1>
                    <motion.p
                    variants={fadeIn('down' , 0.4)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once:false, amount:0.4}}
                     className="font-semibold mb-7 text-orange">Slowly Crafted, Quickly Devoured</motion.p>
                    <motion.p
                    variants={fadeIn('down' , 0.8)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once:false, amount:0.4}}
                     className="mb-7 text-white font-base">
                        At Meat Moot, We Give You Kingly Presentation Of Great Meat Garnished With World-Class Recipe That Will Always Leave You Wanting More
                    </motion.p>
                    <motion.div
                    variants={fadeIn('down' , 1)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{once:false, amount:0.4}}>
                        <ScrollLink to="reservation" smooth={true}>
                        <Button variant='orange'>Let's eat</Button>
                        </ScrollLink>
                    </motion.div>
                </div>
                <motion.div
                variants={fadeIn('up' , 1)}
                initial='hidden'
                whileInView={'show'}
                viewport={{once:false, amount:0.4}}
                 className="hidden xl:flex xl:absolute xl:top-[200px] xl:right-0">
                    <Image height={682} width={900} alt="meat dish" src={'/main11.png'}></Image>
                </motion.div>
            </div>
        </div>
        <motion.div
        variants={fadeIn('up' , 1.2)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once:false, amount:0.4}}
         className="hidden xl:flex xl:relative xl:-top-24 z-50">
        <Image height={404} width={320} alt="meat dish" src={'/main3rm.png'}></Image>
        </motion.div>
    </section>
  )
}

export default Hero 