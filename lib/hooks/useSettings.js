'use client'
// lib/hooks/useSettings.js

import { useState, useEffect } from 'react'
import { db }                  from '@/lib/firebase/config'
import { getSettings }         from '@/lib/firebase/firestore'

// Default settings used when Firestore isn't configured yet
const DEFAULT_SETTINGS = {
  id:             'site',
  siteName:       { en: 'Shail Publishing', hi: 'शैल पब्लिशिंग' },
  bannerText:     {
    en: 'New arrivals just landed — Free shipping on orders over ₹499',
    hi: 'नया संग्रह आया है! ₹499 से अधिक के ऑर्डर पर मुफ्त डिलीवरी',
  },
  bannerEnabled:  true,
  contactEmail:   'info@shailpublishing.in',
  contactPhone:   '+91 98765 43210',
  address:        {
    en: 'Shail Education Institute, Near Civil Lines, Prayagraj, UP 211001',
    hi: 'शैल एजुकेशन इंस्टीट्यूट, सिविल लाइन्स के पास, प्रयागराज, UP 211001',
  },
}

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return
    }

    getSettings()
      .then(data => { if (data) setSettings(data) })
      .catch(err => {
        console.error('[Firestore settings]', err.message)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [])

  return { settings, loading, error }
}
