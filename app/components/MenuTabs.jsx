'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { pickLocaleField } from '@/lib/pickLocaleField'

export default function MenuTabs({ categories, locale }) {
  const isAr = locale === 'ar'
  const isRu = locale === 'ru'
  const safeCats = categories || []
  const [activeId, setActiveId] = useState(safeCats[0]?.id || null)

  if (safeCats.length === 0) {
    return (
      <section id="menu" className="section bg-ember-deeper">
        <div className="container mx-auto text-center text-white/70">
          {isAr ? 'لا توجد عناصر في القائمة حالياً.' : isRu ? 'В меню пока нет позиций.' : 'No menu items yet.'}
        </div>
      </section>
    )
  }

  const active = safeCats.find((c) => c.id === activeId) || safeCats[0]
  const catName = pickLocaleField(active, 'name', locale)
  const catDesc = pickLocaleField(active, 'description', locale)

  return (
    <section
      id="menu"
      dir={isAr ? 'rtl' : 'ltr'}
      className="relative section bg-gradient-to-b from-black-heavy via-ember to-black-heavy"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">{isAr ? 'القائمة' : isRu ? 'Меню' : 'The Menu'}</span>
          <h2 className="mt-4 font-display text-white text-4xl sm:text-5xl xl:text-6xl">
            {isAr ? 'لائحة الطعام' : isRu ? 'Фирменные блюда' : 'Signature Selection'}
          </h2>
          <p className="mt-4 text-white/70">
            {isAr
              ? 'مختارات مدخّنة على نار هادئة، توابل بيتية، وأطباق ضيافة من المطبخ الشرق أوسطي.'
              : isRu
              ? 'Копчёные на медленном огне отруба, фирменные специи и ближневосточное гостеприимство — выбор наших шеф-поваров.'
              : 'Wood-smoked cuts, house-rub spices, and Middle-Eastern hospitality — chosen by our chefs.'}
          </p>
        </div>

        {/* Category pills */}
        <div
          role="tablist"
          aria-label="Menu categories"
          className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {safeCats.map((cat) => {
            const label = pickLocaleField(cat, 'name', locale)
            const isActive = cat.id === active.id
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(cat.id)}
                className={`relative px-5 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] rounded-full border transition-all duration-200 ${
                  isActive
                    ? 'border-orange bg-orange text-black-heavy shadow-glow'
                    : 'border-white/10 text-white/75 hover:border-white/30 hover:text-white'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Active category meta */}
        <div className="mt-10 text-center">
          <h3 className="font-display text-orange text-2xl sm:text-3xl">{catName}</h3>
          {catDesc ? (
            <p className="mx-auto mt-3 max-w-2xl text-white/65 text-sm sm:text-base">
              {catDesc}
            </p>
          ) : null}
        </div>

        {/* Items grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {active.items.map((item) => {
              const name = pickLocaleField(item, 'name', locale)
              const desc = pickLocaleField(item, 'description', locale)
              return (
                <article
                  key={item.id}
                  className="card-surface group overflow-hidden flex flex-col"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-ember-light">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.05]"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-white/30 font-display text-3xl">
                        {name?.[0] || 'M'}
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    {item.price != null ? (
                      <span className="absolute top-3 end-3 rounded-full bg-black/70 backdrop-blur px-3 py-1 text-xs font-semibold text-orange ring-1 ring-white/10">
                        {item.currency || 'AED'} {Number(item.price).toFixed(0)}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h4 className="font-display text-xl text-white leading-tight">
                      {name}
                    </h4>
                    {desc ? (
                      <p className="text-sm leading-relaxed text-white/65">{desc}</p>
                    ) : null}
                  </div>
                </article>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
