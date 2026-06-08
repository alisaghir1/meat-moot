'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAppContext } from '../context'
import heroTrans from '../translation/heroTrans.js'

const Hero = () => {
  const [language] = useAppContext()
  const t = heroTrans[language] || heroTrans.en
  const isRtl = language === 'ar'

  return (
    <section
      id="home"
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Video */}
      <div
        className="absolute inset-0 z-0"
        onContextMenu={(e) => e.preventDefault()}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/vidio.mp4" type="video/mp4" />
        </video>
        {/* Layered cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black-heavy" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_30%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto py-32 sm:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow !text-orange justify-center"
          >
            {t.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-display text-white text-balance text-5xl sm:text-6xl xl:text-7xl 2xl:text-8xl leading-[1.05] font-bold"
          >
            {t.title.split('\n').map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-6 max-w-xl text-lg sm:text-xl text-white/80 leading-relaxed"
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/jbr" className="btn-primary">
              {t.button}
            </Link>
            <Link href="/#menu" className="btn-ghost">
              {t.viewMenu}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 flex flex-col items-center gap-3 text-white/60"
          >
            <span className="text-[11px] uppercase tracking-[0.3em]">{t.scroll}</span>
            <div className="h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
