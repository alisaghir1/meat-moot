'use client'

import React, { useState } from "react"
import { RiMenu2Line, RiHomeFill } from 'react-icons/ri'
import { IoCloseOutline } from 'react-icons/io5'
import { BiSolidFoodMenu } from 'react-icons/bi'
import { FaUsers, FaImages, FaLocationArrow, FaCaretDown, FaEnvelope } from 'react-icons/fa'
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

const links = [
  {
    icon: <RiHomeFill />,
    path: '/',
    name: 'home',
    
  },
  {
    icon: <BiSolidFoodMenu />,
    path: '/#menu',
    name: 'menu',
    
  },
  {
    icon: <FaLocationArrow />,
    path: 'branches',
    name: 'branches',
  },
  {
    icon: <FaUsers />,
    path: 'about',
    name: 'about',
  },
  {
    icon: <FaImages />,
    path: 'media',
    name: 'media',
  },
  {
    icon: <FaEnvelope />,
    path: 'contact',
    name: 'contact',
  }
]

const NavMobile = ({ containerStyles, linkStyles, iconStyles }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showMediaDropdown, setShowMediaDropdown] = useState(false)

  return (
    <div className={`${containerStyles}`}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer outline-none">
        <RiMenu2Line className="text-3xl text-white transition-all duration-200" />
      </div>
      <aside className={`${isOpen ? 'right-0' : '-right-full'} bg-black fixed z-20 w-full p-10 top-0 bottom-0 transition-all duration-500`}>
        <div className="flex flex-col items-center justify-start gap-20 h-full">
          <div onClick={() => setIsOpen(false)} className="cursor-pointer text-5xl text-white absolute w-10 h-10 left-8 flex items-center justify-center ">
            <IoCloseOutline />
          </div>
          <Link href={'/'}>
            <Image alt="logo" width={120} height={50} src={'/logo.svg'} />
          </Link>

          <div className="flex flex-col gap-y-8">
            {links.map((link, index) => {
              if (link.name === "media") {
                return (
                  <div key={index} className="relative">
                    <button
                      onClick={() => setShowMediaDropdown(!showMediaDropdown)}
                      className="flex text-white items-center"
                    >
                      <div className="flex gap-x-3 hover:text-orange transition-all duration-300">
                      <div className={`${iconStyles}`}>{link.icon}</div>
                      <div className={`${linkStyles}`}>{link.name}</div>
                      </div>
                      <FaCaretDown className={`ml-2 transform transition-all ${showMediaDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showMediaDropdown && (
                      <div className="absolute bg-black-heavy text-white p-2 rounded shadow-lg mt-1">
                        <Link onClick={() => [setShowMediaDropdown(false), setIsOpen(false)]} href="/blogs" className="block px-4 py-2 hover:text-orange">
                          Blogs
                        </Link>
                        <Link onClick={() => [setShowMediaDropdown(false), setIsOpen(false)]} href="/news" className="block px-4 py-2 hover:text-orange">
                          News
                        </Link>
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link onClick={() => setIsOpen(false)} key={index} href={link.path} smooth='false' className="flex items-center gap-x-3">
                  <div className={`${iconStyles}`}>{link.icon}</div>
                  <div className={`${linkStyles}`}>{link.name}</div>
                </Link>
              )
            })}
            <Link onClick={() => setIsOpen(false)} href="/#reservation">
              <Button variant='orange'>Book now</Button>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default NavMobile
