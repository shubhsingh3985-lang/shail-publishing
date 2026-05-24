'use client'

// components/layout/Header.jsx

import { useState, useRef, useEffect } from 'react'
import Link                            from 'next/link'
import { usePathname, useRouter }      from 'next/navigation'
import { useTheme }                    from 'next-themes'
import { useLanguage }                 from '@/lib/context/LanguageContext'
import MobileNav                       from './MobileNav'
import { cn }                          from '@/lib/utils/cn'
import {
  Sun, Moon, Search, Menu, Globe, ChevronDown, X,
} from 'lucide-react'

export default function Header() {
  const pathname              = usePathname()
  const router                = useRouter()
  const { theme, setTheme }   = useTheme()
  const { t, lang, switchLang } = useLanguage()

  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [langOpen,    setLangOpen]    = useState(false)
  const [mounted,     setMounted]     = useState(false)

  const searchRef = useRef(null)
  const langRef   = useRef(null)

  // Avoid hydration mismatch for theme icon
  useEffect(() => { setMounted(true) }, [])

  // Close lang dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  function handleSearch(e) {
    e.preventDefault()
    if (!searchQuery.trim()) return
    router.push(`/books?search=${encodeURIComponent(searchQuery.trim())}&lang=${lang}`)
    setSearchOpen(false)
    setSearchQuery('')
  }

  const navLinks = [
    { href: '/',           label: t('nav.home')       },
    { href: '/books',      label: t('nav.books')      },
    { href: '/categories', label: t('nav.categories') },
    { href: '/about',      label: t('nav.about')      },
    { href: '/contact',    label: t('nav.contact')    },
  ]

  const isDark = mounted && theme === 'dark'

  return (
    <>
      {/* ── Top announcement banner ───────────────────────────────────── */}
      <div
        className="text-center py-1.5 px-4 text-xs font-medium"
        style={{ background: 'var(--color-crimson)', color: '#fff' }}
      >
        {t('home.banner')}
      </div>

      {/* ── Main nav ─────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background:   'var(--color-nav)',
          borderColor:  'rgba(201,162,39,0.25)',
        }}
      >
        <div className="page-container">
          <div className="flex items-center h-14 gap-2">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 mr-4 focus-gold rounded">
              {/* S3 circle badge */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2"
                style={{ background: '#0F0E0D', borderColor: 'var(--color-gold)' }}
              >
                <span
                  className="text-[11px] font-bold tracking-tight"
                  style={{ color: '#D4FF00' }}
                >
                  S3
                </span>
              </div>
              {/* Text */}
              <div className="hidden sm:flex flex-col leading-none">
                <span
                  className="font-serif text-lg font-black tracking-widest"
                  style={{ color: 'var(--color-gold)' }}
                >
                  SHAIL
                </span>
                <span
                  className="text-[8px] tracking-[0.18em] uppercase mt-0.5"
                  style={{ color: 'rgba(247,244,239,0.5)' }}
                >
                  Publishing &amp; Distributor House
                </span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-0 flex-1">
              {navLinks.map(link => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href + (lang !== 'en' ? `?lang=${lang}` : '')}
                    className={cn(
                      'px-3.5 py-4 text-sm border-b-2 transition-all duration-150',
                      active
                        ? 'border-b-[var(--color-gold)] text-white font-medium'
                        : 'border-transparent text-white/60 hover:text-white hover:border-white/30'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <div className="flex-1 lg:hidden" />

            {/* Right side actions */}
            <div
              className="flex items-center gap-1 pl-3 ml-2 border-l"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >

              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen(v => !v)}
                className="btn-ghost"
                aria-label="Toggle search"
                style={{ color: 'rgba(247,244,239,0.7)' }}
              >
                {searchOpen ? <X size={18} /> : <Search size={18} />}
              </button>

              {/* Language switcher */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen(v => !v)}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background:   'rgba(201,162,39,0.15)',
                    border:       '1px solid rgba(201,162,39,0.3)',
                    color:        'var(--color-gold)',
                  }}
                  aria-label="Switch language"
                >
                  <Globe size={13} />
                  <span>{lang.toUpperCase()}</span>
                  <ChevronDown size={11} className={cn('transition-transform', langOpen && 'rotate-180')} />
                </button>

                {langOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 rounded-lg overflow-hidden shadow-admin z-50 min-w-[130px]"
                    style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
                  >
                    {[
                      { code: 'en', label: 'English',  native: 'English' },
                      { code: 'hi', label: 'Hindi',    native: 'हिंदी'   },
                    ].map(l => (
                      <button
                        key={l.code}
                        onClick={() => { switchLang(l.code); setLangOpen(false) }}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors',
                          lang === l.code
                            ? 'font-medium'
                            : 'hover:bg-[var(--color-raised)]'
                        )}
                        style={{
                          color: lang === l.code ? 'var(--color-gold)' : 'var(--color-text-primary)',
                          background: lang === l.code ? 'rgba(201,162,39,0.08)' : undefined,
                        }}
                      >
                        <span>{l.native}</span>
                        {lang === l.code && (
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-gold)' }} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme toggle */}
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="btn-ghost"
                aria-label="Toggle theme"
                style={{ color: 'rgba(247,244,239,0.7)' }}
              >
                {mounted
                  ? isDark ? <Sun size={18} /> : <Moon size={18} />
                  : <Moon size={18} />
                }
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(true)}
                className="btn-ghost lg:hidden"
                aria-label="Open menu"
                style={{ color: 'rgba(247,244,239,0.7)' }}
              >
                <Menu size={20} />
              </button>

            </div>
          </div>

          {/* ── Search bar (expandable) ─────────────────────────────── */}
          {searchOpen && (
            <div
              className="border-t pb-3 pt-2.5"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <form onSubmit={handleSearch} className="relative">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'rgba(247,244,239,0.4)' }}
                />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('nav.searchPlaceholder')}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg outline-none"
                  style={{
                    background:  'rgba(255,255,255,0.08)',
                    border:      '1px solid rgba(255,255,255,0.12)',
                    color:       '#F7F4EF',
                  }}
                />
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile nav drawer */}
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
      />
    </>
  )
}