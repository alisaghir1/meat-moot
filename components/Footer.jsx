import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/logo.png'
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookF, FaInstagram  } from "react-icons/fa";
import { TbBrandTripadvisor } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
  <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
    <div className="sm:col-span-2">
      <a href="/" aria-label="Go home" title="Company" className="inline-flex items-center">
      <Image src={logo} alt='logo' />
      </a>
      <div className="mt-6 lg:max-w-sm">
        <p className="text-sm text-white">
        Delivering exceptional service and quality with every bite. Experience the finest in dining, prepared with passion and care.
        </p>
      </div>
    </div>
    <div className="space-y-2 text-sm">
      <p className="text-base font-bold tracking-wide text-orange">Contacts</p>
      <div className="flex items-center">
        <p className="mr-1 text-orange">Phone:</p>
        <a href="tel:850-123-5021" aria-label="Our phone" title="Our phone" className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">850-123-5021</a>
      </div>
      <div className="flex items-center">
        <p className="mr-1 text-orange">Email:</p>
        <a href="mailto:info@lorem.mail" aria-label="Our email" title="Our email" className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">info@lorem.mail</a>
      </div>
    </div>
    
    <div>
      <span className="text-base font-bold tracking-wide text-orange">Social</span>
      <div className="flex items-center  mt-1 space-x-6">
        <Link target="_blank" href="https://x.com/meatmoot_sa?mx=2" rel="noopener noreferrer" className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400">
        <RiTwitterXLine className='h-6' />
        </Link>
        <Link target="_blank" href="https://www.instagram.com/meat_moot/#" rel="noopener noreferrer" className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400">
        <FaInstagram className='h-6' />
        </Link>
        <Link target="_blank" href="https://www.facebook.com/meatmoot/" rel="noopener noreferrer"  className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400">
        <FaFacebookF className='h-5' />
       </Link>
       <Link target="_blank" href="https://www.tripadvisor.com/Restaurant_Review-g293974-d24170084-Reviews-Meat_Moot-Istanbul.html" rel="noopener noreferrer"  className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400">
        <TbBrandTripadvisor className='h-6' />
       </Link>
       <Link target="_blank" href="https://www.tiktok.com/@meatmoot1" rel="noopener noreferrer"  className="text-white transition-colors duration-300 hover:text-deep-purple-accent-400 ">
       <span className='text-2xl h-6'>t</span>
       </Link>
      </div>
      <p className="mt-4 text-sm text-white">
      Follow us on social media to stay up-to-date with our latest dishes, special events, and exclusive offers!.
      </p>
    </div>
  </div>
  <div className="flex items-center flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
    <p className="text-sm text-white">
      © Copyright 2024 Meat Moot. All rights reserved.
    </p>
    <ul className="flex items-center flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
      <li>
        <Link href="/terms" className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400">Privacy Policy</Link>
      </li>
      <li>
        <Link href="/terms" className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400">Terms &amp; Conditions</Link>
      </li>
    </ul>
  </div>
</footer>
  )
}

export default Footer