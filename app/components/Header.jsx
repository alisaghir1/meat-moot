'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from './Nav'
import NavMobile from './NavMobile'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-soft ${
        scrolled
          ? 'py-3 bg-black/70 backdrop-blur-lg border-b border-white/[0.06] shadow-card'
          : 'py-6 bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Meat Moot — home"
            className="shrink-0 transition-opacity duration-200 hover:opacity-80"
          >
            <Image
              priority
              alt="Meat Moot"
              width={scrolled ? 96 : 120}
              height={scrolled ? 28 : 35}
              src="/logo.svg"
              className="transition-all duration-300"
            />
          </Link>

          <Nav
            containerStyles="hidden xl:flex items-center gap-x-9 text-sm font-medium tracking-wide text-white/90"
            linkStyles="uppercase tracking-[0.12em] hover:text-orange transition-colors"
          />

          <NavMobile
            containerStyles="xl:hidden"
            iconStyles="text-2xl"
            linkStyles="uppercase tracking-wider"
          />
        </div>
      </div>
    </header>
  )
}
