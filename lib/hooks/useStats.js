'use client'
// lib/hooks/useStats.js
// Fetches real aggregate counts from Firestore using getCountFromServer().
// getCountFromServer() runs the count server-side — no documents are downloaded.
// Falls back to zeros when Firebase is not configured.

import { useState, useEffect }                  from 'react'
import { collection, query, where,
         getCountFromServer }                    from 'firebase/firestore'
import { db }                                    from '@/lib/firebase/config'
import { COL }                                   from '@/lib/firebase/firestore'

export function useStats() {
  const [stats,   setStats]   = useState({ booksCount: 0, authorsCount: 0, categoriesCount: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db) { setLoading(false); return }

    async function fetch() {
      try {
        const [booksSnap, authorsSnap, catsSnap] = await Promise.all([
          // Published books only
          getCountFromServer(
            query(collection(db, COL.BOOKS), where('status', '==', 'published'))
          ),
          // All authors
          getCountFromServer(collection(db, COL.AUTHORS)),
          // Top-level categories only (parentSlug === null)
          getCountFromServer(
            query(collection(db, COL.CATEGORIES), where('parentSlug', '==', null))
          ),
        ])

        setStats({
          booksCount:      booksSnap.data().count,
          authorsCount:    authorsSnap.data().count,
          categoriesCount: catsSnap.data().count,
        })
      } catch (err) {
        console.error('[useStats]', err.message)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [])

  return { stats, loading }
}

// ─── Formatting helper ────────────────────────────────────────────────────────
// 8        → "8"
// 480      → "480"
// 1240     → "1,240+"
// 12500    → "12,500+"
export function formatStatNumber(count) {
  if (!count) return '0'
  const formatted = count.toLocaleString('en-IN')
  return count >= 1000 ? `${formatted}+` : formatted
}
