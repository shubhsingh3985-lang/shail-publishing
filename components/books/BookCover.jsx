'use client'

// components/books/BookCover.jsx
//
// Renders a book cover in two modes:
//   1. Real image  — when book.coverImageUrl is set (uploaded via admin panel)
//   2. Gradient    — fallback using book.coverGradient colours
//
// Used in: BookCard, BookDetail, Homepage strips, BookListRow

import Image from 'next/image'
import { cn } from '@/lib/utils/cn'

// ─── Badge (Bestseller / New / Top Pick) ─────────────────────────────────────
function Badge({ type }) {
  if (!type) return null
  const styles = {
    bestseller: { background: '#C41E3A', color: '#fff' },
    new:        { background: '#C9A227', color: '#0F0E0D' },
    'top-pick': { background: '#7C3AED', color: '#fff' },
  }
  const labels = { bestseller: 'Bestseller', new: 'New', 'top-pick': 'Top Pick' }
  return (
    <span
      className="absolute top-2 right-2 z-10 text-[8px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded pointer-events-none"
      style={styles[type]}
    >
      {labels[type]}
    </span>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function BookCover({
  book,
  className,       // applied to the outer wrapper
  sizes,           // next/image sizes hint — pass based on context
  showBadge = true,
  priority = false, // set true for above-the-fold images
}) {
  const [c1, c2] = book?.coverGradient ?? ['#1a1a2e', '#16213e']
  const title    = book?.title?.en ?? ''
  const author   = book?.author   ?? ''

  // ── Real image ──────────────────────────────────────────────────────────────
  if (book?.coverImageUrl) {
    return (
      <div className={cn('relative overflow-hidden', className)}>
        {showBadge && <Badge type={book.badge} />}
        <Image
          src={book.coverImageUrl}
          alt={`${title} — book cover`}
          fill
          priority={priority}
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          sizes={sizes ?? '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw'}
        />
      </div>
    )
  }

  // ── Gradient fallback ───────────────────────────────────────────────────────
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center p-4',
        className
      )}
      style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)` }}
    >
      {showBadge && <Badge type={book?.badge} />}
      <p className="font-serif text-[13px] font-bold text-center leading-tight text-white/90 mb-2">
        {title}
      </p>
      <div
        className="w-8 h-0.5 my-1 opacity-60"
        style={{ background: '#C9A227' }}
      />
      <p className="text-[9px] tracking-wider uppercase text-white/40 text-center">
        {author}
      </p>
    </div>
  )
}
