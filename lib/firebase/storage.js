// lib/firebase/storage.js
//
// Firebase Storage helpers for image uploads (book covers, author photos).
// Activate by uncommenting once Firebase is live.

// import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
// import { storage } from './config'

// ─── Upload a book cover image ───────────────────────────────────────────────
// @param  file      — File object from an <input type="file">
// @param  bookSlug  — Used as the filename to keep things organized
// @returns          — The public download URL string
//
// export async function uploadBookCover(file, bookSlug) {
//   const ext      = file.name.split('.').pop()
//   const path     = `books/${bookSlug}.${ext}`
//   const imageRef = ref(storage, path)
//   await uploadBytes(imageRef, file)
//   const url = await getDownloadURL(imageRef)
//   return url
// }

// ─── Upload an author photo ──────────────────────────────────────────────────
// export async function uploadAuthorPhoto(file, authorSlug) {
//   const ext      = file.name.split('.').pop()
//   const path     = `authors/${authorSlug}.${ext}`
//   const imageRef = ref(storage, path)
//   await uploadBytes(imageRef, file)
//   return await getDownloadURL(imageRef)
// }

// ─── Delete a file by its full storage path ──────────────────────────────────
// export async function deleteFile(storagePath) {
//   const imageRef = ref(storage, storagePath)
//   await deleteObject(imageRef)
// }