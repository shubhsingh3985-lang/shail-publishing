'use client'

import { useState, useMemo }           from 'react'
import { useParams }                   from 'next/navigation'
import Link                            from 'next/link'
import Header                          from '@/components/layout/Header'
import Footer                          from '@/components/layout/Footer'
import BookCard                        from '@/components/books/BookCard'
import { BookGridSkeleton, Skeleton }  from '@/components/ui/Skeleton'
import { useLanguage }                 from '@/lib/context/LanguageContext'
import { useCategory, useSubcategories } from '@/lib/hooks/useCategories'
import { useBooksByCategory }          from '@/lib/hooks/useBooks'
import { cn }                          from '@/lib/utils/cn'
import {
  ArrowLeft, Search, SlidersHorizontal,
  ChevronDown, BookOpen, X,
} from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'newest',    en: 'Newest First',       hi: 'नवीनतम पहले'      },
  { value: 'priceAsc',  en: 'Price: Low to High', hi: 'कीमत: कम से अधिक' },
  { value: 'priceDesc', en: 'Price: High to Low', hi: 'कीमत: अधिक से कम' },
  { value: 'title',     en: 'Title A–Z',           hi: 'शीर्षक A–Z'        },
  { value: 'rating',    en: 'Highest Rated',       hi: 'सर्वोच्च रेटेड'    },
]

const LANG_FILTERS = [
  { value: 'all', en: 'All Languages', hi: 'सभी भाषाएँ' },
  { value: 'en',  en: 'English',        hi: 'अंग्रेजी'  },
  { value: 'hi',  en: 'Hindi',          hi: 'हिंदी'     },
]

export default function CategoryPage() {
  const { slug }           = useParams()
  const { isHindi, lang }  = useLanguage()

  const { category, loading: catLoading }     = useCategory(slug)
  const { books, loading: booksLoading }      = useBooksByCategory(slug)
  const { subcategories }                     = useSubcategories(slug)

  const [search,       setSearch]       = useState('')
  const [sort,         setSort]         = useState('newest')
  const [langFilter,   setLangFilter]   = useState('all')
  const [activeSubcat, setActiveSubcat] = useState('all') // 'all' or subcategorySlug
  const [sortOpen,     setSortOpen]     = useState(false)

  function langHref(path) { return lang !== 'en' ? `${path}?lang=${lang}` : path }

  const displayed = useMemo(() => {
    let result = [...books]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(b =>
        b.title?.en?.toLowerCase().includes(q) ||
        b.title?.hi?.toLowerCase().includes(q)  ||
        b.author?.toLowerCase().includes(q)
      )
    }
    if (langFilter !== 'all') result = result.filter(b => b.language === langFilter)
    if (activeSubcat !== 'all') result = result.filter(b => b.subcategorySlug === activeSubcat)
    switch (sort) {
      case 'newest':    result.sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt)); break
      case 'priceAsc':  result.sort((a,b) => a.price-b.price);                             break
      case 'priceDesc': result.sort((a,b) => b.price-a.price);                             break
      case 'title':     result.sort((a,b) => (a.title?.en||'').localeCompare(b.title?.en||'')); break
      case 'rating':    result.sort((a,b) => b.rating-a.rating);                           break
    }
    return result
  }, [books, search, sort, langFilter, activeSubcat])

  const clearFilters = () => { setSearch(''); setSort('newest'); setLangFilter('all'); setActiveSubcat('all') }
  const hasFilters   = search || sort !== 'newest' || langFilter !== 'all' || activeSubcat !== 'all'
  const currentSort  = SORT_OPTIONS.find(o => o.value === sort)

  // ── Loading state ──────────────────────────────────────────────────────────
  if (catLoading) {
    return (
      <>
        <Header />
        <main>
          <section className="py-10 border-b" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
            <div className="page-container">
              <Skeleton className="h-4 w-32 mb-5" />
              <div className="flex items-center gap-4">
                <Skeleton className="w-14 h-14 rounded-2xl flex-shrink-0" />
                <div className="space-y-2"><Skeleton className="h-8 w-48" /><Skeleton className="h-4 w-64" /></div>
              </div>
            </div>
          </section>
          <div className="section-pad" style={{ background: 'var(--color-page)' }}>
            <div className="page-container"><BookGridSkeleton count={12} /></div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // ── 404 state ──────────────────────────────────────────────────────────────
  if (!category) {
    return (
      <>
        <Header />
        <main className="section-pad">
          <div className="page-container text-center py-20">
            <BookOpen size={48} className="mx-auto mb-4" style={{ color: 'var(--color-text-muted)' }} />
            <h1 className="font-serif text-2xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              {isHindi ? 'श्रेणी नहीं मिली' : 'Category Not Found'}
            </h1>
            <Link href={langHref('/categories')} className="btn-primary inline-flex">
              {isHindi ? 'सभी श्रेणियाँ देखें' : 'View All Categories'}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>

        {/* Category hero */}
        <section className="py-10 border-b" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <div className="page-container">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-5">
              <Link href={langHref('/categories')} className="flex items-center gap-1.5 text-xs hover:text-[var(--color-gold)] transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                <ArrowLeft size={13} /> {isHindi ? 'सभी श्रेणियाँ' : 'All Categories'}
              </Link>
              <span style={{ color: 'var(--color-border-strong)' }}>/</span>
              <span className={cn('text-xs font-medium', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-secondary)' }}>
                {isHindi ? category.name.hi : category.name.en}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: `${category.color}18` }}>
                {category.icon}
              </div>
              <div>
                <h1 className={cn('font-serif text-3xl font-bold mb-1', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>
                  {isHindi ? category.name.hi : category.name.en}
                </h1>
                <p className={cn('text-sm', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-secondary)' }}>
                  {isHindi ? category.description.hi : category.description.en}
                </p>
              </div>
            </div>

            {/* Subcategory pills — shown only if subcategories exist */}
            {subcategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                <button onClick={() => setActiveSubcat('all')}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{
                    background: activeSubcat === 'all' ? category.color : 'var(--color-raised)',
                    color:      activeSubcat === 'all' ? '#fff'          : 'var(--color-text-secondary)',
                    border:     `1px solid ${activeSubcat === 'all' ? category.color : 'var(--color-border)'}`,
                  }}>
                  {isHindi ? 'सभी' : 'All'}
                </button>
                {subcategories.map(sub => (
                  <button key={sub.slug} onClick={() => setActiveSubcat(sub.slug)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: activeSubcat === sub.slug ? category.color : 'var(--color-raised)',
                      color:      activeSubcat === sub.slug ? '#fff'          : 'var(--color-text-secondary)',
                      border:     `1px solid ${activeSubcat === sub.slug ? category.color : 'var(--color-border)'}`,
                    }}>
                    {isHindi ? sub.name.hi : sub.name.en}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Toolbar */}
        <div className="sticky top-[57px] z-30 border-b py-3" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
          <div className="page-container flex flex-wrap items-center gap-3">

            {/* Search */}
            <div className="flex items-center gap-2 rounded-lg px-3 py-2 flex-1 min-w-[180px] max-w-xs"
              style={{ background: 'var(--color-page)', border: '1px solid var(--color-border)' }}>
              <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder={isHindi ? 'पुस्तकें खोजें...' : 'Search books...'}
                className={cn('bg-transparent outline-none text-sm flex-1', isHindi && 'font-hindi')}
                style={{ color: 'var(--color-text-primary)' }} />
              {search && <button onClick={() => setSearch('')}><X size={13} style={{ color: 'var(--color-text-muted)' }} /></button>}
            </div>

            {/* Language filter */}
            <div className="flex items-center gap-1.5">
              {LANG_FILTERS.map(opt => (
                <button key={opt.value} onClick={() => setLangFilter(opt.value)}
                  className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-all', isHindi && opt.value === 'hi' && 'font-hindi')}
                  style={{
                    background: langFilter === opt.value ? 'rgba(201,162,39,0.12)' : 'var(--color-page)',
                    border:     `1px solid ${langFilter === opt.value ? 'rgba(201,162,39,0.4)' : 'var(--color-border)'}`,
                    color:      langFilter === opt.value ? 'var(--color-gold)'                  : 'var(--color-text-secondary)',
                  }}>
                  {isHindi ? opt.hi : opt.en}
                </button>
              ))}
            </div>

            <div className="flex-1" />

            {/* Sort */}
            <div className="relative">
              <button onClick={() => setSortOpen(v => !v)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
                style={{ background: 'var(--color-page)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                <SlidersHorizontal size={13} />
                <span className={cn(isHindi && 'font-hindi')}>{isHindi ? currentSort.hi : currentSort.en}</span>
                <ChevronDown size={12} className={cn('transition-transform', sortOpen && 'rotate-180')} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1.5 rounded-xl overflow-hidden z-50 min-w-[180px]"
                  style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-admin)' }}>
                  {SORT_OPTIONS.map(opt => (
                    <button key={opt.value} onClick={() => { setSort(opt.value); setSortOpen(false) }}
                      className={cn('w-full text-left px-4 py-2.5 text-xs hover:bg-[var(--color-raised)]', isHindi && 'font-hindi')}
                      style={{ color: sort === opt.value ? 'var(--color-gold)' : 'var(--color-text-primary)', fontWeight: sort === opt.value ? 500 : 400, background: sort === opt.value ? 'rgba(201,162,39,0.06)' : undefined }}>
                      {isHindi ? opt.hi : opt.en}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {booksLoading ? '...' : `${displayed.length} ${isHindi ? 'पुस्तकें' : 'books'}`}
            </span>
          </div>
        </div>

        {/* Books grid */}
        <section className="section-pad" style={{ background: 'var(--color-page)' }}>
          <div className="page-container">
            {booksLoading
              ? <BookGridSkeleton count={12} />
              : displayed.length > 0
                ? <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {displayed.map(book => <BookCard key={book.id} book={book} />)}
                  </div>
                : <div className="text-center py-20">
                    <BookOpen size={44} className="mx-auto mb-4" style={{ color: 'var(--color-text-muted)' }} />
                    <h3 className={cn('font-serif text-lg font-bold mb-2', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>
                      {isHindi ? 'कोई पुस्तक नहीं मिली' : 'No books found'}
                    </h3>
                    <p className={cn('text-sm mb-5', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-secondary)' }}>
                      {isHindi ? 'फ़िल्टर बदलकर दोबारा कोशिश करें।' : 'Try adjusting your search or filters.'}
                    </p>
                    {hasFilters && (
                      <button onClick={clearFilters} className="btn-outline text-sm">
                        {isHindi ? 'फ़िल्टर साफ़ करें' : 'Clear Filters'}
                      </button>
                    )}
                  </div>
            }
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
