// scripts/hash-admin-key.mjs
//
// Generates the SHA-256 hash to put in ADMIN_KEY_HASH (.env.local / Secret Manager).
//
// Usage:
//   node scripts/hash-admin-key.mjs "your-chosen-admin-key"
//
// Then copy the printed hash into:
//   - .env.local (local dev)              → ADMIN_KEY_HASH=...
//   - Secret Manager (production)         → secret named ADMIN_KEY_HASH

import crypto from 'crypto'

const key = process.argv[2]

if (!key) {
  console.error('\n❌ Please provide a key to hash.\n')
  console.error('   Usage: node scripts/hash-admin-key.mjs "your-chosen-admin-key"\n')
  process.exit(1)
}

const hash = crypto.createHash('sha256').update(key).digest('hex')

console.log('\n✅ Admin key hash generated:\n')
console.log(hash)
console.log('\nAdd this to .env.local as:')
console.log(`ADMIN_KEY_HASH=${hash}\n`)
