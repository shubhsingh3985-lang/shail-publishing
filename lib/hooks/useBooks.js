'use client'
// lib/hooks/useBooks.js
// All book data hooks. Each tries Firestore first.
// If db is null (Firebase not configured) it uses hardcoded data silently.

import { useState, useEffect } from 'react'
import { db }                  from '@/lib/firebase/config'
import * as fs                 from '@/lib/firebase/firestore'
import * as local              from '@/lib/data/books'

// ─── Generic fetch helper ─────────────────────────────────────────────────────
function useFirestoreQuery(firestoreFn, fallbackFn, deps = []) {
  const [data,    setData]    = useState(null)   // null = not yet loaded
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    if (!db) {
      // Firebase not configured — use local data immediately
      const result = fallbackFn()
      if (!cancelled) { setData(result); setLoading(false) }
      return
    }

    firestoreFn()
      .then(result => { if (!cancelled) setData(result) })
      .catch(err => {
        console.error('[Firestore]', err.message)
        if (!cancelled) {
          setData(fallbackFn())   // silent fallback
          setError(err.message)
        }
      })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error }
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** All published books */
export function useAllBooks() {
  const { data, loading, error } = useFirestoreQuery(
    () => fs.getAllBooks(),
    () => local.getAllBooks(),
  )
  return { books: data ?? [], loading, error }
}

/** Featured books only */
export function useFeaturedBooks() {
  const { data, loading, error } = useFirestoreQuery(
    () => fs.getFeaturedBooks(),
    () => local.getFeaturedBooks(),
  )
  return { books: data ?? [], loading, error }
}

/** N most recently added books */
export function useRecentBooks(count = 8) {
  const { data, loading, error } = useFirestoreQuery(
    () => fs.getRecentBooks(count),
    () => local.getRecentBooks(count),
    [count]
  )
  return { books: data ?? [], loading, error }
}

/** Single book by URL slug */
export function useBook(slug) {
  const { data, loading, error } = useFirestoreQuery(
    () => fs.getBookBySlug(slug),
    () => local.getBookBySlug(slug),
    [slug]
  )
  return { book: data, loading, error }
}

/** All books in a top-level category (includes subcategories) */
export function useBooksByCategory(categorySlug) {
  const { data, loading, error } = useFirestoreQuery(
    () => fs.getBooksByCategory(categorySlug),
    () => local.getBooksByCategory(categorySlug),
    [categorySlug]
  )
  return { books: data ?? [], loading, error }
}

/** Books in a specific subcategory */
export function useBooksBySubcategory(subcategorySlug) {
  const { data, loading, error } = useFirestoreQuery(
    () => fs.getBooksBySubcategory(subcategorySlug),
    () => local.getBooksBySubcategory(subcategorySlug),
    [subcategorySlug]
  )
  return { books: data ?? [], loading, error }
}
