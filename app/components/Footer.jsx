'use client'

import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/logo.svg'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { TbBrandTripadvisor } from 'react-icons/tb'
import { useAppContext } from '../context'
import footerTrans from '../translation/footerTrans'
import navTrans from '../translation/navTrans'

const social = [
  { href: 'https://www.instagram.com/meatmoot.uae', label: 'Instagram', Icon: FaInstagram },
  { href: 'https://www.facebook.com/meatmoot.uae', label: 'Facebook', Icon: FaFacebookF },
  {
    href: 'https://www.tripadvisor.com/Restaurant_Review-g293974-d24170084-Reviews-Meat_Moot-Istanbul.html',
    label: 'Tripadvisor',
    Icon: TbBrandTripadvisor,
  },
  {
    href: 'https://www.tiktok.com/@meatmootuae',
    label: 'TikTok',
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
]

const branches = [
  { href: '/jbr', key: 'jbr' },
  { href: '/city-walk', key: 'city_walk' },
  { href: '/al-qana', key: 'al_qana' },
  { href: '/khawaneej', key: 'khawaneej' },
  { href: '/dubai-hills', key: 'dubai_hills' },
  { href: '/al-ain', key: 'al_ain' },
]

export default function Footer() {
  const [language] = useAppContext()
  const t = footerTrans[language] || footerTrans.en
  const branchTranslations = navTrans[language] || navTrans.en
  const isRtl = language === 'ar'

  return (
    <footer
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative mt-24 border-t border-white/[0.06] bg-ember-deeper text-white"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange/40 to-transparent" />

      <div className="container mx-auto py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" aria-label="Meat Moot — home" className="inline-block">
              <Image src={logo} width={140} height={40} alt="Meat Moot" />
            </Link>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">
              {t.description}
            </p>

            <div className="mt-8 flex items-center gap-3">
              {social.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white/80 transition-all duration-200 hover:border-orange hover:bg-orange/10 hover:text-orange"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div className="lg:col-span-3">
            <h4 className="eyebrow !text-orange">{t.contacts}</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <span className="block text-white/50">{t.email}</span>
                <Link href="mailto:hello@meatmoot.ae" className="link-underline">
                  hello@meatmoot.ae
                </Link>
              </li>
              <li>
                <span className="block text-white/50">Dubai, UAE</span>
                <span className="text-white">{t.locations}</span>
              </li>
            </ul>
          </div>

          {/* Branches */}
          <div className="lg:col-span-4">
            <h4 className="eyebrow !text-orange">Branches</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {branches.map((b) => (
                <li key={b.href}>
                  <Link
                    href={b.href}
                    className="link-underline text-white/85 hover:text-orange"
                  >
                    {branchTranslations[b.key]}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[13px] leading-relaxed text-white/55">
              {t.followUs}
            </p>
          </div>
        </div>

        <div className="divider-rule my-10" />

        <div className="flex flex-col-reverse items-center justify-between gap-4 text-[13px] text-white/55 sm:flex-row">
          <p>{t.copyright}</p>
          <ul className="flex items-center gap-5">
            <li>
              <Link href="/terms" className="hover:text-orange">
                {t.privacyPolicy}
              </Link>
            </li>
            <li aria-hidden className="h-3 w-px bg-white/20" />
            <li>
              <Link href="/terms" className="hover:text-orange">
                {t.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
