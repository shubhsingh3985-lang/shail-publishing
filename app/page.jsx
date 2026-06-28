'use client'

import { useState }              from 'react'
import { useRouter }             from 'next/navigation'
import Link                      from 'next/link'
import Header                    from '@/components/layout/Header'
import Footer                    from '@/components/layout/Footer'
import BookCard                  from '@/components/books/BookCard'
import BookCover                 from '@/components/books/BookCover'
import { BookGridSkeleton, CategoryGridSkeleton, BookStripSkeleton, FeaturedBookSkeleton } from '@/components/ui/Skeleton'
import { useLanguage }           from '@/lib/context/LanguageContext'
import { useFeaturedBooks }      from '@/lib/hooks/useBooks'
import { useRecentBooks }        from '@/lib/hooks/useBooks'
import { useTopLevelCategories } from '@/lib/hooks/useCategories'
import { useSettings }                     from '@/lib/hooks/useSettings'
import { useStats, formatStatNumber }      from '@/lib/hooks/useStats'
import { formatPrice }                     from '@/lib/utils/formatPrice'
import { cn }                              from '@/lib/utils/cn'
import { Search, ArrowRight, ChevronRight } from 'lucide-react'

const TABS = ['all', 'school', 'college', 'competitive', 'literature']

const HERO_TAGS = [
  { en: '📘 Mathematics', hi: '📘 गणित',     slug: 'mathematics'  },
  { en: '🔬 Science',     hi: '🔬 विज्ञान',  slug: 'science'      },
  { en: '🏛️ History',    hi: '🏛️ इतिहास',  slug: 'history'      },
  { en: '📖 Hindi',       hi: '📖 हिंदी',    slug: 'hindi'        },
  { en: '🌐 English',     hi: '🌐 अंग्रेजी', slug: 'english'      },
  { en: '💼 Commerce',    hi: '💼 वाणिज्य',  slug: 'commerce'     },
]

export default function HomePage() {
  const router               = useRouter()
  const { isHindi, lang }    = useLanguage()
  const { settings }         = useSettings()
  const [query, setQuery]    = useState('')
  const [tab,   setTab]      = useState('all')

  const { books: featuredBooks, loading: featuredLoading } = useFeaturedBooks()
  const { books: recentBooks,   loading: recentLoading   } = useRecentBooks(8)
  const { categories,           loading: catLoading       } = useTopLevelCategories()
  const { stats,                loading: statsLoading     } = useStats()

  const tabBooks = tab === 'all'
    ? featuredBooks
    : featuredBooks.filter(b => b.level === tab)

  function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/books?search=${encodeURIComponent(query.trim())}&lang=${lang}`)
  }

  function langHref(path) {
    return lang !== 'en' ? `${path}?lang=${lang}` : path
  }

  const bannerText = isHindi
    ? settings.bannerText?.hi
    : settings.bannerText?.en

  return (
    <>
      <Header />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 text-center relative overflow-hidden" style={{ background: 'var(--color-card)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(201,162,39,0.06) 0%, transparent 70%)' }} />
          <div className="page-container relative">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-2xs font-semibold tracking-widest uppercase mb-5"
              style={{ background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.25)', color: 'var(--color-gold)' }}>
              ✦ {isHindi ? 'भारत का प्रमुख शैक्षिक प्रकाशक' : "India's Premier Educational Publisher"}
            </div>

            <h1 className={cn('font-serif font-black text-4xl sm:text-5xl leading-tight mb-4 max-w-2xl mx-auto', isHindi && 'font-hindi')}
              style={{ color: 'var(--color-text-primary)' }}>
              {isHindi
                ? <>ज्ञान की कोई <em className="not-italic" style={{ color: 'var(--color-gold)' }}>सीमा नहीं</em></>
                : <>Discover <em className="not-italic" style={{ color: 'var(--color-gold)' }}>Knowledge</em><br />Without Limits</>}
            </h1>

            <p className={cn('text-base max-w-xl mx-auto mb-8 leading-relaxed', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-secondary)' }}>
              {isHindi
                ? 'हिंदी और अंग्रेजी में हजारों शैक्षिक पुस्तकें, संदर्भ सामग्री और अकादमिक संसाधन।'
                : 'Thousands of curated educational books, reference materials, and academic resources — available in Hindi and English.'}
            </p>

            <form onSubmit={handleSearch} className="flex items-center max-w-xl mx-auto rounded-xl overflow-hidden mb-6"
              style={{ background: 'var(--color-page)', border: '1.5px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
              <Search size={18} className="ml-4 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} />
              <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                placeholder={isHindi ? 'शीर्षक, लेखक, विषय से खोजें...' : 'Search by title, author, subject...'}
                className={cn('flex-1 bg-transparent outline-none px-3 py-3 text-sm', isHindi && 'font-hindi')}
                style={{ color: 'var(--color-text-primary)' }} />
              <button type="submit" className="m-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold flex-shrink-0"
                style={{ background: 'var(--color-gold)', color: '#0F0E0D' }}>
                {isHindi ? 'खोजें' : 'Search'}
              </button>
            </form>

            <div className="flex flex-wrap justify-center gap-2">
              {HERO_TAGS.map(tag => (
                <Link key={tag.slug} href={langHref(`/categories/${tag.slug}`)}
                  className={cn('text-xs px-3.5 py-1.5 rounded-full transition-all hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]', isHindi && 'font-hindi')}
                  style={{ background: 'var(--color-raised)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                  {isHindi ? tag.hi : tag.en}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats bar ──────────────────────────────────────────────── */}
        <div className="border-y" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <div className="page-container">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x" style={{ borderColor: 'var(--color-border)' }}>

              {/* Books count — from Firestore */}
              <StatCell
                num={statsLoading ? null : formatStatNumber(stats.booksCount)}
                label={isHindi ? 'पुस्तकें उपलब्ध' : 'Books Available'}
                isHindi={isHindi}
              />
              {/* Authors count — from Firestore */}
              <StatCell
                num={statsLoading ? null : formatStatNumber(stats.authorsCount)}
                label={isHindi ? 'लेखक और शिक्षाविद' : 'Authors & Educators'}
                isHindi={isHindi}
              />
              {/* Categories count — from Firestore */}
              <StatCell
                num={statsLoading ? null : formatStatNumber(stats.categoriesCount)}
                label={isHindi ? 'विषय श्रेणियाँ' : 'Subject Categories'}
                isHindi={isHindi}
              />
              {/* Years — fixed company claim, not from DB */}
              <StatCell
                num="25+"
                label={isHindi ? 'उत्कृष्टता के वर्ष' : 'Years of Excellence'}
                isHindi={isHindi}
              />

            </div>
          </div>
        </div>

        {/* ── Featured Books ──────────────────────────────────────────── */}
        <section className="section-pad" style={{ background: 'var(--color-page)' }}>
          <div className="page-container">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="section-label mb-1">{isHindi ? 'चुनिंदा संग्रह' : 'Curated Selection'}</p>
                <h2 className={cn('font-serif text-2xl font-bold', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>
                  {isHindi ? 'विशेष पुस्तकें' : 'Featured Books'}
                </h2>
              </div>
              <Link href={langHref('/books')} className="flex items-center gap-1 text-sm font-medium hover:underline" style={{ color: 'var(--color-gold)' }}>
                {isHindi ? 'सभी देखें' : 'View All'} <ArrowRight size={14} />
              </Link>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 border-b mb-6 overflow-x-auto no-scrollbar" style={{ borderColor: 'var(--color-border)' }}>
              {TABS.map(key => {
                const labels = { all: isHindi ? 'सभी' : 'All', school: isHindi ? 'स्कूल' : 'School', college: isHindi ? 'कॉलेज' : 'College', competitive: isHindi ? 'प्रतियोगी' : 'Competitive', literature: isHindi ? 'साहित्य' : 'Literature' }
                return (
                  <button key={key} onClick={() => setTab(key)}
                    className={cn('px-4 py-2.5 text-sm border-b-2 -mb-px whitespace-nowrap transition-all', isHindi && 'font-hindi', tab === key ? 'font-medium border-[var(--color-gold)]' : 'border-transparent hover:border-[var(--color-border-strong)]')}
                    style={{ color: tab === key ? 'var(--color-gold)' : 'var(--color-text-muted)' }}>
                    {labels[key]}
                  </button>
                )
              })}
            </div>

            {featuredLoading
              ? <BookGridSkeleton count={6} />
              : tabBooks.length > 0
                ? <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {tabBooks.map(book => <BookCard key={book.id} book={book} />)}
                  </div>
                : <p className={cn('text-center py-10 text-sm', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-muted)' }}>
                    {isHindi ? 'इस श्रेणी में कोई पुस्तक नहीं।' : 'No featured books in this category yet.'}
                  </p>
            }
          </div>
        </section>

        {/* ── Categories ──────────────────────────────────────────────── */}
        <section className="section-pad" style={{ background: 'var(--color-card)' }}>
          <div className="page-container">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="section-label mb-1">{isHindi ? 'विषय के अनुसार' : 'Browse by Subject'}</p>
                <h2 className={cn('font-serif text-2xl font-bold', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>
                  {isHindi ? 'पुस्तक श्रेणियाँ' : 'Book Categories'}
                </h2>
              </div>
              <Link href={langHref('/categories')} className="flex items-center gap-1 text-sm font-medium hover:underline" style={{ color: 'var(--color-gold)' }}>
                {isHindi ? 'सभी श्रेणियाँ' : 'All Categories'} <ArrowRight size={14} />
              </Link>
            </div>

            {catLoading
              ? <CategoryGridSkeleton count={8} />
              : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {categories.map(cat => (
                    <Link key={cat.id} href={langHref(`/categories/${cat.slug}`)}
                      className="card p-4 group hover:border-[var(--color-gold)] hover:bg-[rgba(201,162,39,0.02)] relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" style={{ background: cat.color }} />
                      <span className="text-2xl mb-3 block">{cat.icon}</span>
                      <h3 className={cn('text-sm font-medium mb-1', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>
                        {isHindi ? cat.name.hi : cat.name.en}
                      </h3>
                      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {cat.bookCount?.toLocaleString('en-IN')} {isHindi ? 'पुस्तकें' : 'books'}
                      </p>
                      <ChevronRight size={14} className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-gold)' }} />
                    </Link>
                  ))}
                </div>
            }
          </div>
        </section>

        {/* ── Editor's Picks ──────────────────────────────────────────── */}
        <section className="section-pad" style={{ background: 'var(--color-page)' }}>
          <div className="page-container">
            <div className="mb-6">
              <p className="section-label mb-1">{isHindi ? 'संपादक की पसंद' : "Editor's Choice"}</p>
              <h2 className={cn('font-serif text-2xl font-bold', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>
                {isHindi ? 'विशेष शीर्षक' : 'Featured Titles'}
              </h2>
            </div>
            {featuredLoading
              ? <div className="grid md:grid-cols-2 gap-4"><FeaturedBookSkeleton /><FeaturedBookSkeleton /></div>
              : <div className="grid md:grid-cols-2 gap-4">
                  {featuredBooks.slice(0, 2).map(book => {
                    const [c1, c2] = book.coverGradient ?? ['#1a1a2e', '#16213e']
                    const title    = isHindi && book.title?.hi ? book.title.hi : book.title?.en
                    const desc     = isHindi && book.description?.hi ? book.description.hi : book.description?.en
                    return (
                      <div key={book.id} className="card p-5 flex gap-4 hover:border-[var(--color-gold)] hover:-translate-y-0.5">
                        {/* Mini cover */}
                        <div className="w-20 h-[120px] rounded-lg flex-shrink-0 overflow-hidden">
                          <BookCover
                            book={book}
                            className="w-full h-full"
                            sizes="80px"
                            showBadge={false}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-2xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: 'var(--color-gold)' }}>{isHindi ? 'विशेष' : 'Featured'}</p>
                          <h3 className={cn('font-serif text-base font-bold leading-snug mb-1', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>{title}</h3>
                          <p className="text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>{book.author}</p>
                          <p className={cn('text-xs leading-relaxed mb-3 line-clamp-3', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-secondary)' }}>{desc}</p>
                          <div className="flex items-center gap-2">
                            <Link href={langHref(`/books/${book.slug}`)} className="btn-primary text-xs py-1.5 px-3">{isHindi ? 'विवरण देखें' : 'View Details'}</Link>
                            <span className="text-sm font-semibold" style={{ color: 'var(--color-gold)' }}>{formatPrice(book.price)}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
            }
          </div>
        </section>

        {/* ── Recently Added ──────────────────────────────────────────── */}
        <section className="section-pad" style={{ background: 'var(--color-card)' }}>
          <div className="page-container">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="section-label mb-1">{isHindi ? 'अभी आया' : 'Just Arrived'}</p>
                <h2 className={cn('font-serif text-2xl font-bold', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>
                  {isHindi ? 'नई पुस्तकें' : 'Recently Added'}
                </h2>
              </div>
              <Link href={langHref('/books?sort=newest')} className="flex items-center gap-1 text-sm font-medium hover:underline" style={{ color: 'var(--color-gold)' }}>
                {isHindi ? 'सभी नई पुस्तकें' : 'See All New'} <ArrowRight size={14} />
              </Link>
            </div>

            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {recentLoading
                ? Array.from({ length: 8 }).map((_, i) => <BookStripSkeleton key={i} />)
                : recentBooks.map(book => {
                    const title = isHindi && book.title?.hi ? book.title.hi : book.title?.en
                    return (
                      <Link key={book.id} href={langHref(`/books/${book.slug}`)} className="flex-shrink-0 w-24 group">
                        <div className="w-24 aspect-[2/3] rounded-lg mb-2 overflow-hidden">
                          <BookCover
                            book={book}
                            className="w-full h-full transition-transform group-hover:-translate-y-1"
                            sizes="96px"
                            showBadge={false}
                          />
                        </div>
                        <p className={cn('text-xs font-medium leading-tight line-clamp-2', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>{title}</p>
                        <p className="text-[10px] mt-0.5 truncate" style={{ color: 'var(--color-text-muted)' }}>{book.author}</p>
                      </Link>
                    )
                  })
              }
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

// ─── StatCell ─────────────────────────────────────────────────────────────────
// num === null means still loading — shows a shimmer placeholder
function StatCell({ num, label, isHindi }) {
  return (
    <div className="py-5 text-center" style={{ borderColor: 'var(--color-border)' }}>
      {num === null
        ? <div className="skeleton h-7 w-16 rounded mx-auto mb-2" />
        : <div className="font-serif text-2xl font-bold" style={{ color: 'var(--color-gold)' }}>{num}</div>
      }
      <div className={cn('text-xs mt-1', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </div>
    </div>
  )
}
