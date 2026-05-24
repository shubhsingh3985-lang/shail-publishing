// lib/firebase/firestore.js
// All Firestore operations — active and working.
// Each function is used by its matching hook in lib/hooks/.
// If db is null (Firebase not configured) the hooks fall back to hardcoded data automatically.

import {
  collection, doc, getDoc, getDocs,
  addDoc, updateDoc, deleteDoc, setDoc,
  query, where, orderBy, limit,
  serverTimestamp, increment, writeBatch,
} from 'firebase/firestore'
import { db } from './config'

// ─── Collection names ─────────────────────────────────────────────────────────
export const COL = {
  BOOKS:      'books',
  CATEGORIES: 'categories',
  AUTHORS:    'authors',
  SETTINGS:   'settings',
}

// ─── Normalise a Firestore document ──────────────────────────────────────────
// Converts Firestore Timestamps → ISO strings so the rest of the app
// can treat dates as plain strings regardless of data source.
function fromDoc(d) {
  const data = d.data()
  return {
    id: d.id,
    ...data,
    createdAt: data.createdAt?.toDate?.().toISOString() ?? data.createdAt ?? null,
    updatedAt: data.updatedAt?.toDate?.().toISOString() ?? data.updatedAt ?? null,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// BOOKS
// ─────────────────────────────────────────────────────────────────────────────

export async function getAllBooks() {
  const q = query(
    collection(db, COL.BOOKS),
    where('status', '==', 'published'),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(fromDoc)
}

export async function getBookBySlug(slug) {
  const q = query(
    collection(db, COL.BOOKS),
    where('slug', '==', slug),
    limit(1)
  )
  const snap = await getDocs(q)
  if (snap.empty) return null
  return fromDoc(snap.docs[0])
}

export async function getFeaturedBooks() {
  const q = query(
    collection(db, COL.BOOKS),
    where('status',   '==', 'published'),
    where('featured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(12)
  )
  const snap = await getDocs(q)
  return snap.docs.map(fromDoc)
}

export async function getRecentBooks(count = 8) {
  const q = query(
    collection(db, COL.BOOKS),
    where('status', '==', 'published'),
    orderBy('createdAt', 'desc'),
    limit(count)
  )
  const snap = await getDocs(q)
  return snap.docs.map(fromDoc)
}

// All published books in a top-level category (includes any subcategory)
export async function getBooksByCategory(categorySlug) {
  const q = query(
    collection(db, COL.BOOKS),
    where('categorySlug', '==', categorySlug),
    where('status',       '==', 'published'),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(fromDoc)
}

// Books in a specific subcategory only
export async function getBooksBySubcategory(subcategorySlug) {
  const q = query(
    collection(db, COL.BOOKS),
    where('subcategorySlug', '==', subcategorySlug),
    where('status',          '==', 'published'),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(fromDoc)
}

// ── Admin: Add book ──────────────────────────────────────────────────────────
export async function addBook(data) {
  const ref = await addDoc(collection(db, COL.BOOKS), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  // Increment cached counts
  await updateDoc(doc(db, COL.AUTHORS,    data.authorId),     { bookCount: increment(1) })
  await updateDoc(doc(db, COL.CATEGORIES, data.categorySlug), { bookCount: increment(1) })
  return ref.id
}

// ── Admin: Update book ───────────────────────────────────────────────────────
export async function updateBook(id, data) {
  await updateDoc(doc(db, COL.BOOKS, id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// ── Admin: Delete book ───────────────────────────────────────────────────────
export async function deleteBook(id) {
  const snap = await getDoc(doc(db, COL.BOOKS, id))
  const { authorId, categorySlug } = snap.data()
  const batch = writeBatch(db)
  batch.delete(doc(db, COL.BOOKS, id))
  batch.update(doc(db, COL.AUTHORS,    authorId),     { bookCount: increment(-1) })
  batch.update(doc(db, COL.CATEGORIES, categorySlug), { bookCount: increment(-1) })
  await batch.commit()
}

// ── Admin: Toggle featured ───────────────────────────────────────────────────
export async function toggleFeatured(id, featured) {
  await updateDoc(doc(db, COL.BOOKS, id), { featured, updatedAt: serverTimestamp() })
}

// ── Admin: Toggle status ─────────────────────────────────────────────────────
export async function setBookStatus(id, status) {
  await updateDoc(doc(db, COL.BOOKS, id), { status, updatedAt: serverTimestamp() })
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────

export async function getAllCategories() {
  const snap = await getDocs(collection(db, COL.CATEGORIES))
  return snap.docs.map(fromDoc)
}

export async function getTopLevelCategories() {
  const q = query(
    collection(db, COL.CATEGORIES),
    where('parentSlug', '==', null)
  )
  const snap = await getDocs(q)
  return snap.docs.map(fromDoc)
}

export async function getSubcategories(parentSlug) {
  const q = query(
    collection(db, COL.CATEGORIES),
    where('parentSlug', '==', parentSlug)
  )
  const snap = await getDocs(q)
  return snap.docs.map(fromDoc)
}

export async function getCategoryTree() {
  const all      = await getAllCategories()
  const topLevel = all.filter(c => c.parentSlug === null)
  return topLevel.map(cat => ({
    ...cat,
    subcategories: all.filter(c => c.parentSlug === cat.slug),
  }))
}

export async function getCategoryBySlug(slug) {
  const q = query(
    collection(db, COL.CATEGORIES),
    where('slug', '==', slug),
    limit(1)
  )
  const snap = await getDocs(q)
  if (snap.empty) return null
  return fromDoc(snap.docs[0])
}

// ── Admin: Add / update / delete category ────────────────────────────────────
export async function addCategory(data) {
  const ref = await addDoc(collection(db, COL.CATEGORIES), {
    ...data,
    bookCount: 0,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateCategory(id, data) {
  await updateDoc(doc(db, COL.CATEGORIES, id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteCategory(id) {
  await deleteDoc(doc(db, COL.CATEGORIES, id))
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTHORS
// ─────────────────────────────────────────────────────────────────────────────

export async function getAllAuthors() {
  const snap = await getDocs(collection(db, COL.AUTHORS))
  return snap.docs.map(fromDoc)
}

export async function getAuthorBySlug(slug) {
  const q = query(
    collection(db, COL.AUTHORS),
    where('slug', '==', slug),
    limit(1)
  )
  const snap = await getDocs(q)
  if (snap.empty) return null
  return fromDoc(snap.docs[0])
}

export async function addAuthor(data) {
  const ref = await addDoc(collection(db, COL.AUTHORS), {
    ...data,
    bookCount: 0,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateAuthor(id, data) {
  await updateDoc(doc(db, COL.AUTHORS, id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteAuthor(id) {
  await deleteDoc(doc(db, COL.AUTHORS, id))
}

// ─────────────────────────────────────────────────────────────────────────────
// SETTINGS  (singleton — id is always "site")
// ─────────────────────────────────────────────────────────────────────────────

export async function getSettings() {
  const snap = await getDoc(doc(db, COL.SETTINGS, 'site'))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

export async function updateSettings(data) {
  await setDoc(doc(db, COL.SETTINGS, 'site'), {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true })
}
