// lib/hooks/useLanguage.js
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export function useLanguage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const lang = searchParams.get('lang') || 'en'  // 'en' | 'hi'

  function switchLang(newLang) {
    const params = new URLSearchParams(searchParams)
    params.set('lang', newLang)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return { lang, switchLang, isHindi: lang === 'hi' }
}