'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'

const NAV_ITEMS = [
  { href: '/admin', key: 'admin.dashboard' },
  { href: '/admin/blogs', key: 'admin.blogs' },
  { href: '/admin/news', key: 'admin.news' },
  { href: '/admin/menu/categories', key: 'admin.menuCategories' },
  { href: '/admin/menu/items', key: 'admin.menuItems' },
]

export default function AdminLayout({ children, userEmail }) {
  const pathname = usePathname()
  const router = useRouter()
  const { t, language, toggleLanguage } = useLanguage()

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } finally {
      router.push('/admin/login')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex">
      <aside className="w-64 shrink-0 bg-neutral-900 text-neutral-100 flex flex-col">
        <div className="px-6 py-5 border-b border-neutral-800">
          <Link href="/admin" className="block text-lg font-bold tracking-wide text-white">
            MEAT MOOT
          </Link>
          <p className="text-xs text-neutral-400 mt-1">{t('admin.dashboard')}</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-sm transition ${
                  active
                    ? 'bg-orange-500 text-white'
                    : 'text-neutral-200 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                {t(item.key)}
              </Link>
            )
          })}
        </nav>

        <div className="px-4 py-4 border-t border-neutral-800 text-xs space-y-3">
          {userEmail ? (
            <div className="text-neutral-400">
              <div>{t('admin.loggedInAs')}</div>
              <div className="text-neutral-100 truncate">{userEmail}</div>
            </div>
          ) : null}

          <button
            type="button"
            onClick={toggleLanguage}
            className="w-full rounded-md border border-neutral-700 px-3 py-1.5 text-neutral-200 hover:bg-neutral-800"
            aria-label="Toggle language"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-md bg-neutral-800 px-3 py-1.5 text-neutral-100 hover:bg-neutral-700"
          >
            {t('admin.logout')}
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  )
}
