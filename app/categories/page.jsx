'use client'

import { useState, useMemo }        from 'react'
import Link                         from 'next/link'
import Header                       from '@/components/layout/Header'
import Footer                       from '@/components/layout/Footer'
import { CategoryGridSkeleton }     from '@/components/ui/Skeleton'
import { useLanguage }              from '@/lib/context/LanguageContext'
import { useAllCategories }         from '@/lib/hooks/useCategories'
import { useAllBooks }              from '@/lib/hooks/useBooks'
import { cn }                       from '@/lib/utils/cn'
import { Search, ChevronRight, BookOpen } from 'lucide-react'

export default function CategoriesPage() {
  const { isHindi, lang }              = useLanguage()
  const { categories, loading: catLoading } = useAllCategories()
  const { books }                      = useAllBooks()
  const [search, setSearch]            = useState('')

  function langHref(path) { return lang !== 'en' ? `${path}?lang=${lang}` : path }

  // Only top-level categories for this page
  const topLevel = useMemo(() => categories.filter(c => !c.parentSlug), [categories])

  // Attach live book counts
  const categoriesWithCount = useMemo(() =>
    topLevel.map(cat => ({
      ...cat,
      liveCount: books.filter(b => b.categorySlug === cat.slug && b.status === 'published').length || cat.bookCount,
    })), [topLevel, books])

  // Filter by search
  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return categoriesWithCount
    return categoriesWithCount.filter(cat =>
      cat.name.en.toLowerCase().includes(q) || cat.name.hi.includes(q)
    )
  }, [categoriesWithCount, search])

  return (
    <>
      <Header />
      <main>

        {/* Page hero */}
        <section className="py-12 border-b" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <div className="page-container">
            <div className="max-w-xl">
              <p className="section-label mb-2">{isHindi ? 'विषय के अनुसार' : 'Browse by Subject'}</p>
              <h1 className={cn('font-serif text-4xl font-bold mb-3', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>
                {isHindi ? 'पुस्तक श्रेणियाँ' : 'Book Categories'}
              </h1>
              <p className={cn('text-base mb-6', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-secondary)' }}>
                {isHindi ? 'गणित से लेकर साहित्य तक — अपने विषय की पुस्तकें खोजें।' : 'From Mathematics to Literature — find books in your subject area.'}
              </p>
              <div className="flex items-center gap-2 rounded-xl px-4 py-2.5 max-w-sm"
                style={{ background: 'var(--color-page)', border: '1.5px solid var(--color-border)' }}>
                <Search size={16} style={{ color: 'var(--color-text-muted)' }} />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder={isHindi ? 'श्रेणी खोजें...' : 'Search categories...'}
                  className={cn('bg-transparent outline-none text-sm flex-1', isHindi && 'font-hindi')}
                  style={{ color: 'var(--color-text-primary)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <div className="border-b py-3" style={{ background: 'var(--color-raised)', borderColor: 'var(--color-border)' }}>
          <div className="page-container">
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {catLoading ? '...' : isHindi ? `${filtered.length} श्रेणियाँ उपलब्ध` : `${filtered.length} categories available`}
            </p>
          </div>
        </div>

        {/* Grid */}
        <section className="section-pad" style={{ background: 'var(--color-page)' }}>
          <div className="page-container">
            {catLoading
              ? <CategoryGridSkeleton count={8} />
              : filtered.length === 0
                ? <div className="text-center py-20">
                    <BookOpen size={40} className="mx-auto mb-4" style={{ color: 'var(--color-text-muted)' }} />
                    <p className={cn('text-base', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-muted)' }}>
                      {isHindi ? 'कोई श्रेणी नहीं मिली।' : 'No categories found.'}
                    </p>
                  </div>
                : <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filtered.map(cat => (
                      <Link key={cat.id} href={langHref(`/categories/${cat.slug}`)}
                        className="card group p-5 flex flex-col gap-3 hover:-translate-y-1 hover:border-[var(--color-gold)] relative overflow-hidden focus-gold">
                        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: cat.color }} />
                        <div className="flex items-start justify-between">
                          <span className="text-3xl">{cat.icon}</span>
                          <span className="text-2xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${cat.color}18`, color: cat.color }}>
                            {(cat.liveCount || cat.bookCount)?.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div>
                          <h2 className={cn('font-serif text-lg font-bold mb-1', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>
                            {isHindi ? cat.name.hi : cat.name.en}
                          </h2>
                          <p className={cn('text-xs leading-relaxed line-clamp-2', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-secondary)' }}>
                            {isHindi ? cat.description.hi : cat.description.en}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium mt-auto transition-colors group-hover:text-[var(--color-gold)]" style={{ color: 'var(--color-text-muted)' }}>
                          <span className={cn(isHindi && 'font-hindi')}>{isHindi ? 'पुस्तकें देखें' : 'Browse books'}</span>
                          <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </Link>
                    ))}
                  </div>
            }
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
