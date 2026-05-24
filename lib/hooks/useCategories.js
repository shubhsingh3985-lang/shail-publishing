'use client'
// lib/hooks/useCategories.js

import { useState, useEffect } from 'react'
import { db }                  from '@/lib/firebase/config'
import * as fs                 from '@/lib/firebase/firestore'
import * as local              from '@/lib/data/categories'

function useFirestoreQuery(firestoreFn, fallbackFn, deps = []) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    if (!db) {
      const result = fallbackFn()
      if (!cancelled) { setData(result); setLoading(false) }
      return
    }

    firestoreFn()
      .then(result => { if (!cancelled) setData(result) })
      .catch(err => {
        console.error('[Firestore]', err.message)
        if (!cancelled) { setData(fallbackFn()); setError(err.message) }
      })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error }
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Every category — both top-level and subcategories */
export function useAllCategories() {
  const { data, loading, error } = useFirestoreQuery(
    () => fs.getAllCategories(),
    () => local.getAllCategories(),
  )
  return { categories: data ?? [], loading, error }
}

/** Top-level categories only (parentSlug === null) */
export function useTopLevelCategories() {
  const { data, loading, error } = useFirestoreQuery(
    () => fs.getTopLevelCategories(),
    () => local.getTopLevelCategories(),
  )
  return { categories: data ?? [], loading, error }
}

/** Full category tree — each top-level item includes a subcategories array */
export function useCategoryTree() {
  const { data, loading, error } = useFirestoreQuery(
    () => fs.getCategoryTree(),
    () => local.getCategoryTree(),
  )
  return { tree: data ?? [], loading, error }
}

/** Single category by slug — works for both top-level and subcategories */
export function useCategory(slug) {
  const { data, loading, error } = useFirestoreQuery(
    () => fs.getCategoryBySlug(slug),
    () => local.getCategoryBySlug(slug),
    [slug]
  )
  return { category: data, loading, error }
}

/** Subcategories of a given parent slug */
export function useSubcategories(parentSlug) {
  const { data, loading, error } = useFirestoreQuery(
    () => fs.getSubcategories(parentSlug),
    () => local.getSubcategories(parentSlug),
    [parentSlug]
  )
  return { subcategories: data ?? [], loading, error }
}
