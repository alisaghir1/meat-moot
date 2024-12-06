'use client'

import React, {useState} from "react"
import {RiMenu2Line, RiHomeFill} from 'react-icons/ri'
import {IoCloseOutline} from 'react-icons/io5'
import {BiSolidFoodMenu} from 'react-icons/bi'
import {FaUsers, FaEnvelope, FaImages, FaLocationArrow } from 'react-icons/fa'

import {Link as ScrollLink} from 'react-scroll'
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"


const links =[
  {
    icon:<RiHomeFill />,
    path: '/',
    name: 'home',
    offset: -50
  },
  {
    icon:<BiSolidFoodMenu />,
    path: 'menu',
    name: 'menu',
    offset: -50
  },
  {
    icon:<FaLocationArrow />,
    path: 'locations',
    name: 'locations',
    offset: -150
  },
  {
    icon:<FaUsers />,
    path: 'about',
    name: 'about',
    offset: 0
  },
  {
    icon:<FaImages />,
    path: 'blogs',
    name: 'blogs',
    offset: 50
  },
  {
  icon: <FaImages />,
  path:'contact',
  name:'contact',
  offset: 50
}
]


const NavMobile = ({ containerStyles, linkStyles, iconStyles}) => {
  const [isOpen, setIsOpen] = useState(false)
  console.log(isOpen)

  return (
    <div className={`${containerStyles}`}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer outline-none">
      <RiMenu2Line className="text-3xl text-white transition-all duration-200" />
      </div>
      <aside className={`${isOpen ? 'right-0' : '-right-full'} bg-black fixed z-20 w-full p-10 top-0 bottom-0 transition-all duration-500`}>

        <div className="flex flex-col items-center justify-between h-full">
          <div onClick={() => setIsOpen(false)} className="cursor-pointer text-5xl text-white absolute w-10 h-10 left-8 flex items-center justify-center ">
            <IoCloseOutline />
          </div>
          <Link href={'/'}>
          <Image alt="logo" width={120} height={50} src={'/logo.png'} />
          </Link>

          <div className="flex flex-col gap-y-8">
            {links.map((link, index) => {
              return (
              <ScrollLink key={index} to={link.path} offset={link.offset} smooth='false' className="flex items-center gap-x-3">
                <div className={`${iconStyles}`}>{link.icon}</div>
                <div className={`${linkStyles}`}>{link.name}</div>
              </ScrollLink>
              )
            })}
            <ScrollLink to="reservation" smooth offset={-150}>
              <Button variant='orange'>Book now</Button>
            </ScrollLink>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default NavMobile