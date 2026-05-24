'use client'

// lib/context/LanguageContext.jsx
//
// Provides language state across the entire app.
// Language is read from the ?lang= query parameter.
// Falls back to localStorage preference, then defaults to 'en'.
// The LanguageSwitcher component calls switchLang() to update it.

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter, usePathname, useSearchParams }                     from 'next/navigation'
import en from '@/messages/en.json'
import hi from '@/messages/hi.json'

// ─── Supported languages ─────────────────────────────────────────────────────
export const LANGUAGES = {
  en: { code: 'en', label: 'English', nativeLabel: 'English',  flag: '🇬🇧' },
  hi: { code: 'hi', label: 'Hindi',   nativeLabel: 'हिंदी',    flag: '🇮🇳' },
}

const translations = { en, hi }

// ─── Context ─────────────────────────────────────────────────────────────────
const LanguageContext = createContext(null)

// ─── Provider ────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }) {
  const router       = useRouter()
  const pathname     = usePathname()
  const searchParams = useSearchParams()

  // Determine initial language:
  // 1. ?lang= query param  →  2. localStorage  →  3. 'en'
  const [lang, setLang] = useState(() => {
    const fromQuery = searchParams.get('lang')
    if (fromQuery && LANGUAGES[fromQuery]) return fromQuery

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shail-lang')
      if (saved && LANGUAGES[saved]) return saved
    }
    return 'en'
  })

  // Keep lang in sync if the URL param changes externally (back/forward navigation)
  useEffect(() => {
    const fromQuery = searchParams.get('lang')
    if (fromQuery && LANGUAGES[fromQuery] && fromQuery !== lang) {
      setLang(fromQuery)
    }
  }, [searchParams]) // eslint-disable-line react-hooks/exhaustive-deps

  // Persist preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shail-lang', lang)
  }, [lang])

  // Switch language — updates state, URL param, and localStorage
  const switchLang = useCallback((newLang) => {
    if (!LANGUAGES[newLang] || newLang === lang) return

    setLang(newLang)

    // Build new URL preserving all existing query params
    const params = new URLSearchParams(searchParams.toString())
    params.set('lang', newLang)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [lang, pathname, searchParams, router])

  // Translation helper — t('home.hero.title')
  // Supports dot-notation for nested keys, falls back to 'en' if key missing
  const t = useCallback((key) => {
    const keys   = key.split('.')
    const dict   = translations[lang] ?? translations.en
    let   result = dict

    for (const k of keys) {
      result = result?.[k]
      if (result === undefined) break
    }

    // Fallback to English if key not found in selected language
    if (result === undefined) {
      let fallback = translations.en
      for (const k of keys) fallback = fallback?.[k]
      return fallback ?? key
    }

    return result
  }, [lang])

  const value = {
    lang,
    switchLang,
    t,
    isHindi:   lang === 'hi',
    isEnglish: lang === 'en',
    languages: LANGUAGES,
    currentLanguage: LANGUAGES[lang],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}