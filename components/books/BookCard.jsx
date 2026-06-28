'use client'

// components/books/BookCard.jsx

import Link                         from 'next/link'
import { useLanguage }              from '@/lib/context/LanguageContext'
import BookCover                    from './BookCover'
import { formatPrice, getDiscount } from '@/lib/utils/formatPrice'
import { cn }                       from '@/lib/utils/cn'

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

export default function BookCard({ book, className }) {
  const { lang } = useLanguage()
  const discount  = getDiscount(book.price, book.originalPrice)
  const title     = lang === 'hi' && book.title?.hi ? book.title.hi : book.title?.en

  return (
    <Link
      href={`/books/${book.slug}?lang=${lang}`}
      className={cn('card block overflow-hidden hover:-translate-y-1 focus-gold group', className)}
    >
      {/* Cover — real image or gradient */}
      <BookCover
        book={book}
        className="aspect-[2/3] w-full"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
      />

      {/* Info */}
      <div className="p-3">
        <h3
          className={cn(
            'font-serif text-sm font-semibold leading-snug mb-0.5 line-clamp-2',
            lang === 'hi' && 'font-hindi'
          )}
          style={{ color: 'var(--color-text-primary)' }}
        >
          {title}
        </h3>

        <p className="text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>
          {book.author}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold" style={{ color: 'var(--color-gold)' }}>
              {formatPrice(book.price)}
            </span>
            {book.originalPrice && (
              <span className="text-xs line-through" style={{ color: 'var(--color-text-muted)' }}>
                {formatPrice(book.originalPrice)}
              </span>
            )}
          </div>
          <Stars rating={book.rating} />
        </div>

        {discount > 0 && (
          <p className="text-[10px] font-semibold mt-1" style={{ color: '#059669' }}>
            {discount}% off
          </p>
        )}
      </div>
    </Link>
  )
}
