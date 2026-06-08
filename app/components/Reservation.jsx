'use client'

import { motion } from 'framer-motion'
import { fadeIn } from '@/variants'
import ReservationForm from './ReservationForm'
import { useAppContext } from '../context'

const titles = {
  en: { eyebrow: 'Reserve a Table', title: 'Book your meat moot', sub: 'Tell us when and where — we will take care of the rest.' },
  ru: { eyebrow: 'Бронирование', title: 'Забронируйте столик', sub: 'Скажите нам когда и где — остальное мы возьмём на себя.' },
  ar: { eyebrow: 'احجز طاولة', title: 'احجز تجربتك معنا', sub: 'أخبرنا بالموعد والفرع — وسنتكفل بالباقي.' },
}

const Reservation = () => {
  const [language] = useAppContext()
  const t = titles[language] || titles.en
  const isRtl = language === 'ar'

  return (
    <section
      id="reservation"
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative bg-reservation bg-cover bg-center bg-no-repeat"
    >
      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black-heavy via-black/85 to-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(224,139,58,0.18),transparent_55%)]" />

      <div className="container relative mx-auto py-20 xl:py-32">
        <div className={`flex ${isRtl ? 'justify-start' : 'justify-end'}`}>
          <motion.div
            variants={fadeIn(isRtl ? 'right' : 'left', 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="glass w-full max-w-2xl rounded-2xl p-7 sm:p-10 xl:p-12 shadow-card"
          >
            <span className="eyebrow !text-orange">{t.eyebrow}</span>
            <h2 className="mt-4 font-display text-white text-3xl sm:text-4xl xl:text-5xl leading-tight">
              {t.title}
            </h2>
            <p className="mt-3 text-white/70">{t.sub}</p>
            <div className="mt-8">
              <ReservationForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Reservation
