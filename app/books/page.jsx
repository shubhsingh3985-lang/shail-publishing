'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams }              from 'next/navigation'
import Link                             from 'next/link'
import Header                           from '@/components/layout/Header'
import Footer                           from '@/components/layout/Footer'
import BookCard                         from '@/components/books/BookCard'
import { BookGridSkeleton }             from '@/components/ui/Skeleton'
import { useLanguage }                  from '@/lib/context/LanguageContext'
import { useAllBooks }                  from '@/lib/hooks/useBooks'
import { useAllCategories }             from '@/lib/hooks/useCategories'
import { cn }                           from '@/lib/utils/cn'
import { Search, SlidersHorizontal, X, ChevronDown, BookOpen, LayoutGrid, List } from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'newest',    en: 'Newest First',       hi: 'नवीनतम पहले'      },
  { value: 'priceAsc',  en: 'Price: Low to High', hi: 'कीमत: कम से अधिक' },
  { value: 'priceDesc', en: 'Price: High to Low', hi: 'कीमत: अधिक से कम' },
  { value: 'title',     en: 'Title A–Z',           hi: 'शीर्षक A–Z'        },
  { value: 'rating',    en: 'Highest Rated',       hi: 'सर्वोच्च रेटेड'    },
]
const LEVELS = [
  { value: 'school',      en: 'School',      hi: 'स्कूल'    },
  { value: 'college',     en: 'College',     hi: 'कॉलेज'    },
  { value: 'competitive', en: 'Competitive', hi: 'प्रतियोगी' },
  { value: 'literature',  en: 'Literature',  hi: 'साहित्य'   },
]
const LANG_OPTIONS = [
  { value: 'en', en: 'English', hi: 'अंग्रेजी' },
  { value: 'hi', en: 'Hindi',   hi: 'हिंदी'    },
]
const PAGE_SIZE = 12

export default function BooksPage() {
  const searchParams          = useSearchParams()
  const { isHindi, lang }     = useLanguage()
  const { books, loading }    = useAllBooks()
  const { categories }        = useAllCategories()

  const [search,      setSearch]      = useState(searchParams.get('search') || '')
  const [sort,        setSort]        = useState(searchParams.get('sort')   || 'newest')
  const [selCats,     setSelCats]     = useState([])
  const [selLevels,   setSelLevels]   = useState([])
  const [selLangs,    setSelLangs]    = useState([])
  const [page,        setPage]        = useState(1)
  const [view,        setView]        = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sortOpen,    setSortOpen]    = useState(false)

  useEffect(() => { setPage(1) }, [search, sort, selCats, selLevels, selLangs])

  // Only top-level categories in sidebar
  const topCats = useMemo(() => categories.filter(c => !c.parentSlug), [categories])

  const filtered = useMemo(() => {
    let result = [...books]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(b =>
        b.title?.en?.toLowerCase().includes(q) ||
        b.title?.hi?.toLowerCase().includes(q)  ||
        b.author?.toLowerCase().includes(q)
      )
    }
    if (selCats.length)   result = result.filter(b => selCats.includes(b.categorySlug))
    if (selLevels.length) result = result.filter(b => selLevels.includes(b.level))
    if (selLangs.length)  result = result.filter(b => selLangs.includes(b.language))
    switch (sort) {
      case 'newest':    result.sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt)); break
      case 'priceAsc':  result.sort((a,b) => a.price-b.price);                             break
      case 'priceDesc': result.sort((a,b) => b.price-a.price);                             break
      case 'title':     result.sort((a,b) => (a.title?.en||'').localeCompare(b.title?.en||'')); break
      case 'rating':    result.sort((a,b) => b.rating-a.rating);                           break
    }
    return result
  }, [books, search, sort, selCats, selLevels, selLangs])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE)

  function toggle(setter, value) {
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value])
  }

  const hasFilters    = selCats.length || selLevels.length || selLangs.length || search
  const clearAll      = () => { setSearch(''); setSelCats([]); setSelLevels([]); setSelLangs([]); setSort('newest') }
  const currentSort   = SORT_OPTIONS.find(o => o.value === sort)

  const FilterPanel = () => (
    <div className="flex flex-col gap-6">
      {hasFilters && (
        <button onClick={clearAll} className="flex items-center gap-1.5 text-xs font-medium self-start" style={{ color: 'var(--color-crimson)' }}>
          <X size={13} /> {isHindi ? 'सभी फ़िल्टर हटाएं' : 'Clear all filters'}
        </button>
      )}
      <FilterSection title={isHindi ? 'श्रेणी' : 'Category'} isHindi={isHindi}>
        {topCats.map(cat => (
          <FilterCheckbox key={cat.slug} label={isHindi ? cat.name.hi : cat.name.en}
            checked={selCats.includes(cat.slug)} onChange={() => toggle(setSelCats, cat.slug)}
            count={books.filter(b => b.categorySlug === cat.slug).length} isHindi={isHindi} />
        ))}
      </FilterSection>
      <FilterSection title={isHindi ? 'स्तर' : 'Level'} isHindi={isHindi}>
        {LEVELS.map(l => (
          <FilterCheckbox key={l.value} label={isHindi ? l.hi : l.en}
            checked={selLevels.includes(l.value)} onChange={() => toggle(setSelLevels, l.value)}
            count={books.filter(b => b.level === l.value).length} isHindi={isHindi} />
        ))}
      </FilterSection>
      <FilterSection title={isHindi ? 'भाषा' : 'Language'} isHindi={isHindi}>
        {LANG_OPTIONS.map(l => (
          <FilterCheckbox key={l.value} label={isHindi ? l.hi : l.en}
            checked={selLangs.includes(l.value)} onChange={() => toggle(setSelLangs, l.value)}
            count={books.filter(b => b.language === l.value).length} isHindi={isHindi} />
        ))}
      </FilterSection>
    </div>
  )

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-10 border-b" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <div className="page-container">
            <p className="section-label mb-2">{isHindi ? 'संग्रह' : 'Our Collection'}</p>
            <h1 className={cn('font-serif text-4xl font-bold mb-4', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>
              {isHindi ? 'सभी पुस्तकें' : 'Browse Books'}
            </h1>
            <div className="flex items-center gap-2 rounded-xl px-4 py-3 max-w-lg"
              style={{ background: 'var(--color-page)', border: '1.5px solid var(--color-border)' }}>
              <Search size={16} style={{ color: 'var(--color-text-muted)' }} />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder={isHindi ? 'शीर्षक, लेखक, विषय से खोजें...' : 'Search by title, author, subject...'}
                className={cn('bg-transparent outline-none text-sm flex-1', isHindi && 'font-hindi')}
                style={{ color: 'var(--color-text-primary)' }} />
              {search && <button onClick={() => setSearch('')}><X size={14} style={{ color: 'var(--color-text-muted)' }} /></button>}
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <div className="sticky top-[57px] z-30 border-b py-2.5" style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-card)' }}>
          <div className="page-container flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ background: hasFilters ? 'rgba(201,162,39,0.1)' : 'var(--color-page)', border: `1px solid ${hasFilters ? 'rgba(201,162,39,0.4)' : 'var(--color-border)'}`, color: hasFilters ? 'var(--color-gold)' : 'var(--color-text-secondary)' }}>
              <SlidersHorizontal size={13} /> {isHindi ? 'फ़िल्टर' : 'Filters'}
            </button>
            <div className="flex-1" />
            <span className="text-xs hidden sm:block" style={{ color: 'var(--color-text-muted)' }}>
              {loading ? '...' : `${filtered.length} ${isHindi ? 'पुस्तकें' : 'books'}`}
            </span>
            {/* Sort */}
            <div className="relative">
              <button onClick={() => setSortOpen(v => !v)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{ background: 'var(--color-page)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                <span className={cn(isHindi && 'font-hindi')}>{isHindi ? currentSort.hi : currentSort.en}</span>
                <ChevronDown size={12} className={cn('transition-transform', sortOpen && 'rotate-180')} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1.5 rounded-xl overflow-hidden z-50 min-w-[185px]"
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
            {/* View toggle */}
            <div className="hidden sm:flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
              {[{ key: 'grid', Icon: LayoutGrid }, { key: 'list', Icon: List }].map(({ key, Icon }) => (
                <button key={key} onClick={() => setView(key)} className="p-1.5 transition-colors"
                  style={{ background: view === key ? 'rgba(201,162,39,0.12)' : 'transparent', color: view === key ? 'var(--color-gold)' : 'var(--color-text-muted)' }}>
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="section-pad" style={{ background: 'var(--color-page)' }}>
          <div className="page-container flex gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-52 flex-shrink-0">
              <div className="sticky top-28">
                <p className="text-xs font-bold tracking-widest uppercase mb-5 flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
                  <SlidersHorizontal size={13} /> {isHindi ? 'फ़िल्टर' : 'Filters'}
                </p>
                <FilterPanel />
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              {/* Active chips */}
              {hasFilters && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {search && <FilterChip label={`"${search}"`} onRemove={() => setSearch('')} />}
                  {selCats.map(slug => { const cat = topCats.find(c => c.slug === slug); return <FilterChip key={slug} label={isHindi ? cat?.name.hi : cat?.name.en} onRemove={() => toggle(setSelCats, slug)} /> })}
                  {selLevels.map(l => { const lv = LEVELS.find(x => x.value === l); return <FilterChip key={l} label={isHindi ? lv?.hi : lv?.en} onRemove={() => toggle(setSelLevels, l)} /> })}
                  {selLangs.map(l => { const lo = LANG_OPTIONS.find(x => x.value === l); return <FilterChip key={l} label={isHindi ? lo?.hi : lo?.en} onRemove={() => toggle(setSelLangs, l)} /> })}
                </div>
              )}

              {loading
                ? <BookGridSkeleton count={PAGE_SIZE} />
                : paginated.length > 0
                  ? <>
                      <div className={view === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' : 'flex flex-col gap-3'}>
                        {paginated.map(book => view === 'grid' ? <BookCard key={book.id} book={book} /> : <BookListRow key={book.id} book={book} isHindi={isHindi} lang={lang} />)}
                      </div>
                      {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-10">
                          <PageBtn label={isHindi ? '← पिछला' : '← Prev'} onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1} />
                          {Array.from({length:totalPages},(_,i)=>i+1).filter(p=>p===1||p===totalPages||Math.abs(p-page)<=1).reduce((acc,p,i,arr)=>{if(i>0&&p-arr[i-1]>1)acc.push('...');acc.push(p);return acc;},[]).map((p,i)=>
                            p==='...' ? <span key={`e${i}`} className="px-1 text-xs" style={{color:'var(--color-text-muted)'}}>…</span>
                            : <button key={p} onClick={()=>setPage(p)} className="w-8 h-8 rounded-lg text-xs font-medium transition-all"
                                style={{background:page===p?'var(--color-gold)':'var(--color-card)',border:`1px solid ${page===p?'var(--color-gold)':'var(--color-border)'}`,color:page===p?'#0F0E0D':'var(--color-text-secondary)',fontWeight:page===p?600:400}}>{p}</button>
                          )}
                          <PageBtn label={isHindi ? 'अगला →' : 'Next →'} onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages} />
                        </div>
                      )}
                    </>
                  : <div className="text-center py-20">
                      <BookOpen size={44} className="mx-auto mb-4" style={{ color: 'var(--color-text-muted)' }} />
                      <h3 className={cn('font-serif text-lg font-bold mb-2', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>
                        {isHindi ? 'कोई पुस्तक नहीं मिली' : 'No books found'}
                      </h3>
                      <button onClick={clearAll} className="btn-outline text-sm">{isHindi ? 'फ़िल्टर साफ़ करें' : 'Clear all filters'}</button>
                    </div>
              }
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {sidebarOpen && (
          <>
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
            <div className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col lg:hidden" style={{ background: 'var(--color-card)' }}>
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <span className={cn('font-semibold text-sm', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>{isHindi ? 'फ़िल्टर' : 'Filters'}</span>
                <button onClick={() => setSidebarOpen(false)} className="btn-ghost"><X size={18} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-5"><FilterPanel /></div>
              <div className="p-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <button onClick={() => setSidebarOpen(false)} className="btn-primary w-full justify-center">
                  {isHindi ? `${filtered.length} पुस्तकें देखें` : `View ${filtered.length} books`}
                </button>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

function FilterSection({ title, children, isHindi }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b pb-5" style={{ borderColor: 'var(--color-border)' }}>
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between mb-3">
        <span className={cn('text-xs font-bold tracking-wide uppercase', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-secondary)' }}>{title}</span>
        <ChevronDown size={13} className={cn('transition-transform', !open && '-rotate-90')} style={{ color: 'var(--color-text-muted)' }} />
      </button>
      {open && <div className="flex flex-col gap-2">{children}</div>}
    </div>
  )
}

function FilterCheckbox({ label, checked, onChange, count, isHindi }) {
  return (
    <label className="flex items-center justify-between gap-2 cursor-pointer group">
      <div className="flex items-center gap-2">
        <div onClick={onChange} className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
          style={{ background: checked ? 'var(--color-gold)' : 'transparent', border: `1.5px solid ${checked ? 'var(--color-gold)' : 'var(--color-border-strong)'}` }}>
          {checked && <span className="text-[10px] font-bold text-[#0F0E0D]">✓</span>}
        </div>
        <span className={cn('text-xs transition-colors', isHindi && 'font-hindi')} onClick={onChange}
          style={{ color: checked ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>{label}</span>
      </div>
      <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{count}</span>
    </label>
  )
}

function FilterChip({ label, onRemove }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.3)', color: 'var(--color-gold)' }}>
      {label}
      <button onClick={onRemove} className="hover:opacity-70"><X size={11} /></button>
    </div>
  )
}

function PageBtn({ label, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} className="px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-40"
      style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
      {label}
    </button>
  )
}

function BookListRow({ book, isHindi, lang }) {
  const [c1, c2] = book.coverGradient ?? ['#1a1a2e','#16213e']
  const title    = isHindi && book.title?.hi ? book.title.hi : book.title?.en
  const desc     = isHindi && book.description?.hi ? book.description.hi : book.description?.en
  return (
    <Link href={`/books/${book.slug}${lang !== 'en' ? `?lang=${lang}` : ''}`} className="card p-4 flex gap-4 hover:-translate-y-0.5 hover:border-[var(--color-gold)]">
      <div className="w-14 h-[84px] rounded-lg flex-shrink-0 flex items-center justify-center p-1.5" style={{ background: `linear-gradient(135deg,${c1},${c2})` }}>
        <p className="font-serif text-[9px] text-white/80 text-center leading-tight">{book.title?.en}</p>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className={cn('font-serif text-sm font-bold leading-snug mb-0.5', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-primary)' }}>{title}</h3>
            <p className="text-xs mb-1.5" style={{ color: 'var(--color-text-muted)' }}>{book.author}</p>
          </div>
          <span className="text-sm font-bold flex-shrink-0" style={{ color: 'var(--color-gold)' }}>₹{book.price}</span>
        </div>
        <p className={cn('text-xs leading-relaxed line-clamp-2', isHindi && 'font-hindi')} style={{ color: 'var(--color-text-secondary)' }}>{desc}</p>
      </div>
    </Link>
  )
}
