'use client'

// components/layout/Footer.jsx

import Link            from 'next/link'
import { useLanguage } from '@/lib/context/LanguageContext'

const footerLinks = {
  quick:   ['home', 'browseBooks', 'categories', 'newArrivals'],
  company: ['about', 'contact', 'privacy', 'terms'],
  support: ['help', 'shipping', 'returns', 'bulk'],
}

const hrefMap = {
  home:        '/',
  browseBooks: '/books',
  categories:  '/categories',
  newArrivals: '/books?sort=newest',
  about:       '/about',
  contact:     '/contact',
  privacy:     '/privacy',
  terms:       '/terms',
  help:        '/contact',
  shipping:    '/contact',
  returns:     '/contact',
  bulk:        '/contact',
}

export default function Footer() {
  const { t, lang, switchLang } = useLanguage()

  function href(key) {
    const base = hrefMap[key] ?? '/'
    return lang !== 'en' ? `${base}${base.includes('?') ? '&' : '?'}lang=${lang}` : base
  }

  return (
    <footer style={{ background: 'var(--color-nav)' }}>

      {/* ── Gold top border ───────────────────────────────────────────── */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }} />

      <div className="page-container py-12">

        {/* ── Main grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0"
                style={{ background: '#0F0E0D', borderColor: 'var(--color-gold)' }}
              >
                <span className="text-xs font-bold" style={{ color: '#D4FF00' }}>S3</span>
              </div>
              <div>
                <div
                  className="font-serif font-black tracking-widest text-xl leading-none"
                  style={{ color: 'var(--color-gold)' }}
                >
                  SHAIL
                </div>
                <div
                  className="text-[9px] tracking-widest uppercase mt-1"
                  style={{ color: 'rgba(247,244,239,0.4)' }}
                >
                  Education Institute
                </div>
              </div>
            </div>

            <p
              className="text-xs leading-relaxed mb-5"
              style={{ color: 'rgba(247,244,239,0.45)' }}
            >
              {t('footer.tagline')}
            </p>

            {/* Social / contact icons row — placeholder */}
            <div className="flex gap-2">
              {['📧', '📞', '📍'].map((icon, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-base cursor-pointer transition-all hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-2xs font-bold tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-gold)' }}
            >
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.quick.map(key => (
                <li key={key}>
                  <Link
                    href={href(key)}
                    className="text-xs transition-colors hover:text-[var(--color-gold)]"
                    style={{ color: 'rgba(247,244,239,0.5)' }}
                  >
                    {t(`footer.links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              className="text-2xs font-bold tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-gold)' }}
            >
              {t('footer.company')}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map(key => (
                <li key={key}>
                  <Link
                    href={href(key)}
                    className="text-xs transition-colors hover:text-[var(--color-gold)]"
                    style={{ color: 'rgba(247,244,239,0.5)' }}
                  >
                    {t(`footer.links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3
              className="text-2xs font-bold tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-gold)' }}
            >
              {t('footer.support')}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map(key => (
                <li key={key}>
                  <Link
                    href={href(key)}
                    className="text-xs transition-colors hover:text-[var(--color-gold)]"
                    style={{ color: 'rgba(247,244,239,0.5)' }}
                  >
                    {t(`footer.links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(247,244,239,0.3)' }}>
            {t('footer.copyright')}
          </p>

          {/* Language switcher */}
          <div className="flex gap-2">
            {[
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'हिंदी'   },
            ].map(l => (
              <button
                key={l.code}
                onClick={() => switchLang(l.code)}
                className="text-xs px-3 py-1.5 rounded transition-all"
                style={{
                  border: `1px solid ${lang === l.code ? 'rgba(201,162,39,0.5)' : 'rgba(255,255,255,0.12)'}`,
                  color:  lang === l.code ? 'var(--color-gold)' : 'rgba(247,244,239,0.4)',
                  background: lang === l.code ? 'rgba(201,162,39,0.08)' : 'transparent',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}