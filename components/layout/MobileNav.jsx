'use client'

// components/layout/MobileNav.jsx

import { useEffect }              from 'react'
import Link                       from 'next/link'
import { usePathname }            from 'next/navigation'
import { useTheme }               from 'next-themes'
import { useLanguage }            from '@/lib/context/LanguageContext'
import { cn }                     from '@/lib/utils/cn'
import { X, Sun, Moon, Globe }    from 'lucide-react'

export default function MobileNav({ open, onClose, navLinks }) {
  const pathname            = usePathname()
  const { theme, setTheme } = useTheme()
  const { t, lang, switchLang } = useLanguage()

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    function handler(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed top-0 left-0 bottom-0 z-50 w-72 flex flex-col animate-slide-in lg:hidden"
        style={{ background: 'var(--color-nav)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >

        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 h-14 border-b flex-shrink-0"
          style={{ borderColor: 'rgba(201,162,39,0.25)' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center border-2"
              style={{ background: '#0F0E0D', borderColor: 'var(--color-gold)' }}
            >
              <span className="text-[10px] font-bold" style={{ color: '#D4FF00' }}>S3</span>
            </div>
            <span
              className="font-serif font-black tracking-widest text-base"
              style={{ color: 'var(--color-gold)' }}
            >
              SHAIL
            </span>
          </div>
          <button
            onClick={onClose}
            className="btn-ghost"
            style={{ color: 'rgba(247,244,239,0.6)' }}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navLinks.map(link => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href + (lang !== 'en' ? `?lang=${lang}` : '')}
                onClick={onClose}
                className={cn(
                  'flex items-center px-4 py-3 rounded-lg text-sm mb-1 transition-all',
                  active
                    ? 'font-medium'
                    : 'hover:bg-white/5'
                )}
                style={{
                  color: active ? 'var(--color-gold)' : 'rgba(247,244,239,0.75)',
                  background: active ? 'rgba(201,162,39,0.1)' : undefined,
                  borderLeft: active ? '3px solid var(--color-gold)' : '3px solid transparent',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom actions */}
        <div
          className="border-t px-5 py-5 flex flex-col gap-4 flex-shrink-0"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >

          {/* Language switcher */}
          <div>
            <p
              className="text-2xs font-semibold tracking-widest uppercase mb-2.5 flex items-center gap-1.5"
              style={{ color: 'rgba(247,244,239,0.4)' }}
            >
              <Globe size={11} /> Language
            </p>
            <div className="flex gap-2">
              {[
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिंदी'   },
              ].map(l => (
                <button
                  key={l.code}
                  onClick={() => switchLang(l.code)}
                  className="flex-1 py-2 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: lang === l.code
                      ? 'rgba(201,162,39,0.2)'
                      : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${lang === l.code ? 'rgba(201,162,39,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    color: lang === l.code ? 'var(--color-gold)' : 'rgba(247,244,239,0.6)',
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all"
            style={{
              background: 'rgba(255,255,255,0.05)',
              color:      'rgba(247,244,239,0.75)',
            }}
          >
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

        </div>
      </div>
    </>
  )
}