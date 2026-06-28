'use client'

import { useParams }                    from 'next/navigation'
import Link                             from 'next/link'
import Header                           from '@/components/layout/Header'
import Footer                           from '@/components/layout/Footer'
import BookCard                        from '@/components/books/BookCard'
import BookCover                       from '@/components/books/BookCover'
import { Skeleton, BookGridSkeleton }  from '@/components/ui/Skeleton'
import { useLanguage }                  from '@/lib/context/LanguageContext'
import { useBook, useAllBooks }         from '@/lib/hooks/useBooks'
import { useCategory }                  from '@/lib/hooks/useCategories'
import { formatPrice, getDiscount }     from '@/lib/utils/formatPrice'
import { cn }                           from '@/lib/utils/cn'
import { ArrowLeft, Star, Hash, Globe, Layers, FileText, BookMarked, Share2, ChevronRight, BookOpen } from 'lucide-react'

const BADGE_LABELS = {
  bestseller: { en: 'Bestseller', hi: 'बेस्टसेलर' },
  new:        { en: 'New',        hi: 'नया'        },
  'top-pick': { en: 'Top Pick',   hi: 'टॉप पिक'   },
}
const LEVEL_LABELS = {
  school:      { en: 'School',      hi: 'स्कूल'    },
  college:     { en: 'College',     hi: 'कॉलेज'    },
  competitive: { en: 'Competitive', hi: 'प्रतियोगी' },
  literature:  { en: 'Literature',  hi: 'साहित्य'   },
}
const LANG_LABELS = { en: 'English', hi: 'हिंदी', both: 'Hindi + English' }

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={14} fill={i<=rating?'var(--color-gold)':'none'} style={{color:i<=rating?'var(--color-gold)':'var(--color-border-strong)'}} />
      ))}
    </div>
  )
}

function MetaRow({ icon: Icon, label, value, isHindi }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,162,39,0.1)', color: 'var(--color-gold)' }}>
        <Icon size={15} />
      </div>
      <div className="flex-1 flex items-center justify-between gap-4">
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
        <span className={cn('text-sm font-medium text-right', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>{value}</span>
      </div>
    </div>
  )
}

export default function BookDetailPage() {
  const { slug }           = useParams()
  const { isHindi, lang }  = useLanguage()
  const { book, loading }  = useBook(slug)
  const { books: allBooks, loading: allLoading } = useAllBooks()
  const { category }       = useCategory(book?.categorySlug)

  function langHref(path) { return lang !== 'en' ? `${path}?lang=${lang}` : path }

  // Loading state
  if (loading) {
    return (
      <>
        <Header />
        <main className="section-pad" style={{ background: 'var(--color-page)' }}>
          <div className="page-container">
            <div className="grid lg:grid-cols-[280px_1fr] gap-10">
              <div className="flex flex-col gap-4">
                <div className="skeleton aspect-[2/3] rounded-2xl" />
                <div className="card p-5 space-y-3">
                  <Skeleton className="h-8 w-2/3" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
              <div className="space-y-4 pt-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-4/5" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // 404 state
  if (!book) {
    return (
      <>
        <Header />
        <main className="section-pad">
          <div className="page-container text-center py-20">
            <BookOpen size={48} className="mx-auto mb-4" style={{ color: 'var(--color-text-muted)' }} />
            <h1 className="font-serif text-2xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              {isHindi ? 'पुस्तक नहीं मिली' : 'Book Not Found'}
            </h1>
            <Link href={langHref('/books')} className="btn-primary inline-flex">
              {isHindi ? 'सभी पुस्तकें देखें' : 'Browse All Books'}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const [c1, c2]  = book.coverGradient ?? ['#1a1a2e', '#16213e']
  const title     = isHindi && book.title?.hi     ? book.title.hi     : book.title?.en
  const desc      = isHindi && book.description?.hi ? book.description.hi : book.description?.en
  const discount  = getDiscount(book.price, book.originalPrice)
  const related   = allBooks
    .filter(b => b.categorySlug === book.categorySlug && b.id !== book.id)
    .slice(0, 6)

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="border-b py-3" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <div className="page-container flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <Link href={langHref('/')} className="hover:text-[var(--color-gold)] transition-colors">{isHindi ? 'होम' : 'Home'}</Link>
            <ChevronRight size={12} />
            <Link href={langHref('/books')} className="hover:text-[var(--color-gold)] transition-colors">{isHindi ? 'पुस्तकें' : 'Books'}</Link>
            {category && <><ChevronRight size={12} />
              <Link href={langHref(`/categories/${category.slug}`)} className="hover:text-[var(--color-gold)] transition-colors">
                {isHindi ? category.name?.hi : category.name?.en}
              </Link></>}
            <ChevronRight size={12} />
            <span className={cn('truncate max-w-[200px]', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-secondary)' }}>{title}</span>
          </div>
        </div>

        {/* Main detail */}
        <section className="section-pad" style={{ background: 'var(--color-page)' }}>
          <div className="page-container">
            <div className="grid lg:grid-cols-[280px_1fr] gap-10">

              {/* Left: cover + buy */}
              <div className="flex flex-col gap-4">
              {/* Cover — real image or gradient */}
              <div className="rounded-2xl overflow-hidden aspect-[2/3]">
                <BookCover
                  book={book}
                  className="w-full h-full"
                  sizes="(max-width: 1024px) 50vw, 280px"
                  priority
                />
              </div>

                <div className="card p-5 flex flex-col gap-4">
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-serif text-3xl font-bold" style={{ color: 'var(--color-gold)' }}>{formatPrice(book.price)}</span>
                      {book.originalPrice && <span className="text-sm line-through" style={{ color: 'var(--color-text-muted)' }}>{formatPrice(book.originalPrice)}</span>}
                    </div>
                    {discount > 0 && <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(5,150,105,0.1)', color: '#059669' }}>{discount}% off</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="btn-primary justify-center w-full">{isHindi ? 'कार्ट में जोड़ें' : 'Add to Cart'}</button>
                    <button className="btn-outline justify-center w-full text-sm">{isHindi ? 'इच्छासूची में जोड़ें' : 'Save to Wishlist'}</button>
                  </div>
                  <button className="flex items-center justify-center gap-2 text-xs hover:text-[var(--color-gold)] transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                    <Share2 size={13} /> {isHindi ? 'शेयर करें' : 'Share this book'}
                  </button>
                </div>
              </div>

              {/* Right: book info */}
              <div>
                {category && (
                  <Link href={langHref(`/categories/${category.slug}`)} className={cn('inline-flex items-center gap-1.5 text-2xs font-semibold tracking-widest uppercase mb-3 hover:opacity-75', isHindi && 'font-hindi')} style={{ color: 'var(--color-gold)' }}>
                    {category.icon} {isHindi ? category.name?.hi : category.name?.en} <ChevronRight size={11} />
                  </Link>
                )}
                <h1 className={cn('font-serif text-3xl sm:text-4xl font-bold leading-tight mb-2', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>{title}</h1>
                <p className="text-base mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  {isHindi ? 'द्वारा' : 'by'}{' '}
                  <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{book.author}</span>
                </p>
                <div className="flex items-center gap-2 mb-6">
                  <Stars rating={book.rating} />
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{book.rating}/5 · {book.reviewCount?.toLocaleString('en-IN')} reviews</span>
                </div>

                {/* Description */}
                <div className="rounded-xl p-5 mb-6" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                  <h2 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--color-text-muted)' }}>{isHindi ? 'पुस्तक के बारे में' : 'About this book'}</h2>
                  <p className={cn('text-sm leading-relaxed', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-secondary)' }}>{desc}</p>
                </div>

                {/* Metadata */}
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
                  <div className="px-4 py-3 border-b" style={{ background: 'var(--color-raised)', borderColor: 'var(--color-border)' }}>
                    <h2 className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>{isHindi ? 'विवरण' : 'Book Details'}</h2>
                  </div>
                  <div className="px-4" style={{ background: 'var(--color-card)' }}>
                    {book.isbn    && <MetaRow icon={Hash}       label="ISBN"                                               value={book.isbn}                                              isHindi={isHindi} />}
                    {book.pages   && <MetaRow icon={FileText}   label={isHindi?'पृष्ठ':'Pages'}                           value={book.pages}                                             isHindi={isHindi} />}
                    {book.edition && <MetaRow icon={BookMarked} label={isHindi?'संस्करण':'Edition'}                       value={book.edition}                                           isHindi={isHindi} />}
                    <MetaRow icon={Globe}  label={isHindi?'भाषा':'Language'}    value={LANG_LABELS[book.language]??book.language}               isHindi={isHindi} />
                    <MetaRow icon={Layers} label={isHindi?'स्तर':'Level'}        value={isHindi?LEVEL_LABELS[book.level]?.hi:LEVEL_LABELS[book.level]?.en} isHindi={isHindi} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related books */}
        {!allLoading && related.length > 0 && (
          <section className="section-pad" style={{ background: 'var(--color-card)', borderTop: '1px solid var(--color-border)' }}>
            <div className="page-container">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="section-label mb-1">{isHindi ? 'इसी श्रेणी में' : 'In the same category'}</p>
                  <h2 className={cn('font-serif text-2xl font-bold', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>
                    {isHindi ? 'संबंधित पुस्तकें' : 'Related Books'}
                  </h2>
                </div>
                {category && (
                  <Link href={langHref(`/categories/${category.slug}`)} className="flex items-center gap-1 text-sm font-medium hover:underline" style={{ color: 'var(--color-gold)' }}>
                    {isHindi ? 'सभी देखें' : 'View All'} <ChevronRight size={14} />
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {related.map(b => <BookCard key={b.id} book={b} />)}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
