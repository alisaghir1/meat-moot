'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { Button } from '@/app/components/ui/button';
import { useAppContext } from '../context';

/**
 * Shared, premium branch page layout.
 *
 * Props:
 *   translations  object   per-locale dict: { title, description, lets_meat, get_directions, call_us }
 *   images        array    [{ image }]
 *   mapHref       string   Google Maps directions link
 *   phone         string   tel: number (digits, no spaces)
 *   alt           string   base alt text for gallery images (e.g. "Meat Moot JBR")
 */
export default function BranchPage({ translations, images = [], mapHref, phone, alt = 'Meat Moot branch' }) {
  const [language] = useAppContext();
  const isAr = language === 'ar';
  const t = translations[language] || translations.en;

  const eyebrow = isAr ? 'فروعنا' : language === 'ru' ? 'Наш филиал' : 'Our Branch';

  return (
    <main dir={isAr ? 'rtl' : 'ltr'} className="pt-32 sm:pt-40 pb-24">
      {/* Header */}
      <header className="container mx-auto px-5 xl:px-10">
        <motion.div
          variants={fadeIn('down', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow justify-center">{eyebrow}</span>
          <h1 className="mt-5 font-display text-white text-4xl sm:text-5xl xl:text-6xl leading-[1.05]">
            {t.title}
          </h1>
          <p className="mt-6 text-white/70 text-base sm:text-lg leading-relaxed">
            {t.description}
          </p>
        </motion.div>
        <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-orange to-transparent" />
      </header>

      {/* Gallery — bento grid with a featured tile */}
      <section className="container mx-auto px-5 xl:px-10 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[150px] sm:auto-rows-[200px] gap-4 sm:gap-5">
          {images.map((item, index) => {
            const featured = index === 0;
            return (
              <motion.div
                variants={fadeIn('up', 0.4 + (index % 4) * 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
                key={index}
                className={`relative group overflow-hidden rounded-2xl ring-1 ring-white/10 bg-ember-light ${
                  featured ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <Image
                  src={item.image}
                  alt={`${alt} ${index + 1}`}
                  fill
                  sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA card */}
      <section className="container mx-auto px-5 xl:px-10 mt-20">
        <motion.div
          variants={fadeIn('up', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.4 }}
          className="mx-auto max-w-3xl card-surface !rounded-2xl text-center px-6 py-12 sm:px-12"
        >
          <h2 className="font-display text-white text-3xl sm:text-4xl">{t.lets_meat}</h2>
          <p className="mt-3 text-white/60">
            {isAr
              ? 'احجز طريقك إلينا أو اتصل مباشرةً.'
              : language === 'ru'
              ? 'Постройте маршрут к нам или позвоните напрямую.'
              : 'Find your way to us or give us a call.'}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link target="_blank" href={mapHref} className="w-full sm:w-auto">
              <Button variant="orange" className="w-full sm:w-56 gap-2">
                <FaMapMarkerAlt />
                {t.get_directions}
              </Button>
            </Link>
            {phone && (
              <Link href={`tel:${phone}`} className="w-full sm:w-auto">
                <Button
                  variant="black"
                  className="w-full sm:w-56 gap-2 border border-orange hover:bg-orange hover:text-white"
                >
                  <FaPhoneAlt />
                  {t.call_us}
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
