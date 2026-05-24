// scripts/seed.mjs
// Populates Firestore with the hardcoded data from lib/data/.
//
// Usage:
//   node scripts/seed.mjs
//
// Prerequisites:
//   1. Fill in .env.local with your Firebase credentials
//   2. In Firebase Console → Firestore → Rules, temporarily set:
//        allow read, write: if true;
//      Run this script, then restore your real rules.
//
// The script uses writeBatch (max 500 docs per batch).
// It is safe to run multiple times — each call overwrites existing documents.

import { initializeApp }   from 'firebase/app'
import {
  getFirestore,
  collection, doc,
  writeBatch, setDoc,
} from 'firebase/firestore'
import { createRequire }   from 'module'
import { fileURLToPath }   from 'url'
import { dirname, resolve } from 'path'

// Load .env.local
const require  = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const dotenv   = require('dotenv')
dotenv.config({ path: resolve(__dirname, '../.env.local') })

// ─── Firebase init ────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const missing = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k)

if (missing.length) {
  console.error('❌ Missing env vars:', missing.join(', '))
  console.error('   Copy .env.local.example → .env.local and fill in your credentials.')
  process.exit(1)
}

const app = initializeApp(firebaseConfig)
const db  = getFirestore(app)

// ─── Import hardcoded data ────────────────────────────────────────────────────
const { books }      = await import('../lib/data/books.js')
const { categories } = await import('../lib/data/categories.js')
const { authors }    = await import('../lib/data/authors.js')

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Seed a collection in batches of 499 (Firestore limit is 500 per batch)
async function seedCollection(collectionName, items, transform) {
  const BATCH_SIZE = 499
  let count = 0

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = writeBatch(db)
    const chunk = items.slice(i, i + BATCH_SIZE)

    chunk.forEach(item => {
      const { id, ...data } = item
      const docData = transform ? transform(data) : data
      batch.set(doc(collection(db, collectionName), id), docData)
    })

    await batch.commit()
    count += chunk.length
  }

  return count
}

// ─── Seed ─────────────────────────────────────────────────────────────────────
async function seed() {
  console.log('\n🌱 Seeding Firestore...\n')

  // Books
  const bookCount = await seedCollection('books', books, data => ({
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(),
  }))
  console.log(`✓ Books:      ${bookCount} documents`)

  // Categories (top-level + subcategories — all in same collection)
  const catCount = await seedCollection('categories', categories, data => ({
    ...data,
    createdAt: new Date(),
  }))
  console.log(`✓ Categories: ${catCount} documents`)

  // Authors
  const authorCount = await seedCollection('authors', authors, data => ({
    ...data,
    createdAt: new Date(),
  }))
  console.log(`✓ Authors:    ${authorCount} documents`)

  // Settings — singleton document
  await setDoc(doc(db, 'settings', 'site'), {
    siteName: { en: 'Shail Publishing', hi: 'शैल पब्लिशिंग' },
    bannerText: {
      en: 'New arrivals just landed — Free shipping on orders over ₹499',
      hi: 'नया संग्रह आया है! ₹499 से अधिक के ऑर्डर पर मुफ्त डिलीवरी',
    },
    bannerEnabled:  true,
    contactEmail:   'info@shailpublishing.in',
    contactPhone:   '+91 98765 43210',
    address: {
      en: 'Shail Education Institute, Near Civil Lines, Prayagraj, UP 211001',
      hi: 'शैल एजुकेशन इंस्टीट्यूट, सिविल लाइन्स के पास, प्रयागराज, UP 211001',
    },
    updatedAt: new Date(),
  })
  console.log('✓ Settings:   1 document')

  console.log('\n✅ Seeding complete!\n')
  console.log('Next steps:')
  console.log('  1. Restore your Firestore security rules')
  console.log('  2. Run: npm run dev')
  console.log('  3. The app now reads from Firestore\n')
  process.exit(0)
}

seed().catch(err => {
  console.error('\n❌ Seeding failed:', err.message)
  process.exit(1)
})
