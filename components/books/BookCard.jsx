'use client'

// components/books/BookCard.jsx

import Link                         from 'next/link'
import { useLanguage }              from '@/lib/context/LanguageContext'
import { formatPrice, getDiscount } from '@/lib/utils/formatPrice'
import { cn }                       from '@/lib/utils/cn'

// ─── Star rating ─────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className="text-[10px]"
          style={{ color: i <= rating ? 'var(--color-gold)' : 'var(--color-border-strong)' }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

// ─── Badge ───────────────────────────────────────────────────────────────────
function BookBadge({ type }) {
  if (!type) return null
  const styles = {
    bestseller: { background: 'var(--color-crimson)', color: '#fff' },
    new:        { background: 'var(--color-gold)',    color: '#0F0E0D' },
    'top-pick': { background: '#7C3AED',              color: '#fff'   },
  }
  const labels = {
    bestseller: 'Bestseller',
    new:        'New',
    'top-pick': 'Top Pick',
  }

  return (
    <span
      className="absolute top-2 right-2 text-[8px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded"
      style={styles[type]}
    >
      {labels[type]}
    </span>
  )
}

// ─── Book cover (gradient placeholder, swapped for <Image> once covers exist) ─
function BookCover({ book }) {
  const [c1, c2] = book.coverGradient ?? ['#1a1a2e', '#16213e']
  const title    = book.title.en

  return (
    <div
      className="aspect-[2/3] flex flex-col items-center justify-center p-4 relative"
      style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)` }}
    >
      <BookBadge type={book.badge} />
      <p className="font-serif text-[13px] font-bold text-center leading-tight text-white/90 mb-2">
        {title}
      </p>
      <div
        className="w-8 h-0.5 my-1 opacity-60"
        style={{ background: 'var(--color-gold)' }}
      />
      <p className="text-[9px] tracking-wider uppercase text-white/40 text-center">
        {book.author}
      </p>
    </div>
  )
}

// ─── Main BookCard ────────────────────────────────────────────────────────────
export default function BookCard({ book, className }) {
  const { lang } = useLanguage()
  const discount  = getDiscount(book.price, book.originalPrice)
  const title     = lang === 'hi' && book.title.hi ? book.title.hi : book.title.en

  return (
    <Link
      href={`/books/${book.slug}?lang=${lang}`}
      className={cn(
        'card block overflow-hidden hover:-translate-y-1 focus-gold',
        className
      )}
    >
      {/* Cover */}
      <div className="overflow-hidden">
        <BookCover book={book} />
      </div>

      {/* Info */}
      <div className="p-3">
        {/* Title */}
        <h3
          className={cn(
            'font-serif text-sm font-semibold leading-snug mb-0.5 line-clamp-2',
            lang === 'hi' && 'font-hindi'
          )}
          style={{ color: 'var(--color-text-primary)' }}
        >
          {title}
        </h3>

        {/* Author */}
        <p className="text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>
          {book.author}
        </p>

        {/* Price row */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold" style={{ color: 'var(--color-gold)' }}>
              {formatPrice(book.price)}
            </span>
            {book.originalPrice && (
              <span
                className="text-xs line-through"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {formatPrice(book.originalPrice)}
              </span>
            )}
          </div>
          <Stars rating={book.rating} />
        </div>

        {/* Discount badge */}
        {discount > 0 && (
          <p className="text-[10px] font-semibold mt-1" style={{ color: '#059669' }}>
            {discount}% off
          </p>
        )}
      </div>
    </Link>
  )
}