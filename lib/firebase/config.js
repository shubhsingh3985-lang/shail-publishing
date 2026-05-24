// lib/firebase/config.js
// Firebase is now active. Fill in NEXT_PUBLIC_FIREBASE_* values in .env.local
// If env vars are missing, db will be null and all hooks fall back to hardcoded data.

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore }                    from 'firebase/firestore'
import { getStorage }                      from 'firebase/storage'

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Only initialize if every env var is present
const isConfigured = Object.values(firebaseConfig).every(Boolean)

let app     = null
let db      = null
let storage = null

if (isConfigured) {
  app     = getApps().length ? getApp() : initializeApp(firebaseConfig)
  db      = getFirestore(app)
  storage = getStorage(app)
} else if (process.env.NODE_ENV === 'development') {
  console.warn(
    '[Shail] Firebase env vars missing — running on hardcoded data.\n' +
    'Copy .env.local.example → .env.local and fill in your Firebase credentials.'
  )
}

export { db, storage }
export default app
