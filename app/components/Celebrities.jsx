'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeIn } from '@/variants'
import { useAppContext } from '../context'
import celebrityTrans from '../translation/celebrityTrans.js'

const celebrities = [
  { image: '/celeb1.webp' },
  { image: '/celeb5.jpeg' },
  { image: '/celeb2.webp' },
  { image: '/celeb7.jpg' },
  { image: '/celeb3.jpeg' },
  { image: '/celeb4.jpeg' },
  { image: '/celeb8.jpg' },
  { image: '/celeb9.jpg' },
]

const Celebrities = () => {
  const [language] = useAppContext()
  const t = celebrityTrans[language] || celebrityTrans.en
  const isRtl = language === 'ar'

  return (
    <section
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative section bg-gradient-to-b from-black-heavy via-black to-black-heavy"
    >
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow justify-center">{t.eyebrow}</span>
          <h2 className="mt-4 font-display text-white text-4xl sm:text-5xl xl:text-6xl">
            {t.title}
          </h2>
          <p className="mt-5 text-white/70">{t.description}</p>
        </motion.div>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 sm:gap-6 md:columns-3 lg:columns-4 [&>*]:mb-5 sm:[&>*]:mb-6">
          {celebrities.map((c, i) => (
            <motion.figure
              key={i}
              variants={fadeIn('up', 0.2 + (i % 4) * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="group relative break-inside-avoid overflow-hidden rounded-xl border border-white/[0.06] bg-ember-light"
            >
              <Image
                src={c.image}
                alt={`Notable guest ${i + 1}`}
                width={1080}
                height={1080}
                className="w-full h-auto object-cover transition-all duration-500 ease-soft group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Celebrities
