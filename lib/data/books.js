// lib/data/books.js
// Hardcoded book data — active now.
// Firestore version: lib/firebase/firestore.js (commented out).
//
// Subcategory fields are optional:
//   subcategorySlug: null  → book sits directly under the top-level category
//   subcategorySlug: "biology" → book belongs to the Biology subcategory

export const books = [
  {
    id: 'book-1',
    slug: 'advanced-mathematics-class-12',
    title:            { en: 'Advanced Mathematics Class XII', hi: 'उन्नत गणित कक्षा XII' },
    description:      {
      en: 'The most comprehensive mathematics guide for Class XII students. Covers all CBSE topics with solved examples, practice problems, and previous year questions.',
      hi: 'कक्षा XII के छात्रों के लिए सबसे व्यापक गणित गाइड। हल किए गए उदाहरणों, अभ्यास समस्याओं और पिछले वर्ष के प्रश्नों के साथ सभी CBSE विषयों को कवर करता है।',
    },
    author:           'R.D. Sharma',
    authorSlug:       'rd-sharma',
    categorySlug:     'mathematics',
    categoryName:     { en: 'Mathematics', hi: 'गणित' },
    subcategorySlug:  'calculus',
    subcategoryName:  { en: 'Calculus', hi: 'कलन' },
    price: 385, originalPrice: 520,
    language: 'en', level: 'school',
    featured: true, status: 'published', badge: 'bestseller',
    rating: 5, reviewCount: 1243,
    pages: 856, edition: '2024', isbn: '978-81-19901-23-4',
    coverGradient: ['#1a2744', '#2d4a8a'], coverImageUrl: null,
    createdAt: '2024-01-15',
  },
  {
    id: 'book-2',
    slug: 'hindi-sahitya-ka-itihas',
    title:            { en: 'History of Hindi Literature', hi: 'हिंदी साहित्य का इतिहास' },
    description:      {
      en: 'The definitive history of Hindi literature from its origins to modern times. Essential for BA and MA Hindi students.',
      hi: 'उत्पत्ति से आधुनिक काल तक हिंदी साहित्य का निश्चित इतिहास। बीए और एमए हिंदी छात्रों के लिए आवश्यक।',
    },
    author:           'Dr. Ram Chandra Shukla',
    authorSlug:       'dr-ram-chandra-shukla',
    categorySlug:     'hindi',
    categoryName:     { en: 'Hindi', hi: 'हिंदी' },
    subcategorySlug:  'hindi-literature',
    subcategoryName:  { en: 'Hindi Literature', hi: 'हिंदी साहित्य' },
    price: 295, originalPrice: null,
    language: 'hi', level: 'college',
    featured: true, status: 'published', badge: 'new',
    rating: 4, reviewCount: 876,
    pages: 620, edition: '2023', isbn: '978-81-19901-45-6',
    coverGradient: ['#2d1b00', '#8B4513'], coverImageUrl: null,
    createdAt: '2024-02-10',
  },
  {
    id: 'book-3',
    slug: 'organic-chemistry-vol-1',
    title:            { en: 'Organic Chemistry Vol. I', hi: 'कार्बनिक रसायन विज्ञान भाग I' },
    description:      {
      en: 'A comprehensive guide to organic chemistry for B.Sc. first year students. Covers all reactions, mechanisms, and named reactions with clear explanations.',
      hi: 'बी.एससी. प्रथम वर्ष के छात्रों के लिए कार्बनिक रसायन की व्यापक गाइड।',
    },
    author:           'J.D. Lee',
    authorSlug:       'jd-lee',
    categorySlug:     'science',
    categoryName:     { en: 'Science', hi: 'विज्ञान' },
    subcategorySlug:  'chemistry',
    subcategoryName:  { en: 'Chemistry', hi: 'रसायन विज्ञान' },
    price: 450, originalPrice: 580,
    language: 'en', level: 'college',
    featured: false, status: 'published', badge: null,
    rating: 5, reviewCount: 654,
    pages: 720, edition: '2023', isbn: '978-81-19901-67-8',
    coverGradient: ['#0d3320', '#1B6B3A'], coverImageUrl: null,
    createdAt: '2024-01-28',
  },
  {
    id: 'book-4',
    slug: 'indian-polity-upsc',
    title:            { en: 'Indian Polity for UPSC', hi: 'UPSC के लिए भारतीय राजव्यवस्था' },
    description:      {
      en: 'The most authoritative book on Indian Polity for UPSC Civil Services aspirants. Covers the Constitution, governance, and political system in comprehensive detail.',
      hi: 'UPSC सिविल सेवा के उम्मीदवारों के लिए भारतीय राजव्यवस्था पर सबसे प्रामाणिक पुस्तक।',
    },
    author:           'M. Laxmikanth',
    authorSlug:       'm-laxmikanth',
    categorySlug:     'competitive',
    categoryName:     { en: 'Competitive Exams', hi: 'प्रतियोगी परीक्षाएं' },
    subcategorySlug:  'upsc',
    subcategoryName:  { en: 'UPSC Civil Services', hi: 'UPSC सिविल सेवा' },
    price: 625, originalPrice: 750,
    language: 'en', level: 'competitive',
    featured: true, status: 'published', badge: 'top-pick',
    rating: 5, reviewCount: 2341,
    pages: 944, edition: '6th Edition', isbn: '978-81-19901-89-0',
    coverGradient: ['#3d0d1a', '#8B1A2A'], coverImageUrl: null,
    createdAt: '2024-03-01',
  },
  {
    id: 'book-5',
    slug: 'physics-ncert-exemplar-11-12',
    title:            { en: 'Physics NCERT Exemplar Class 11-12', hi: 'भौतिकी NCERT एग्जेम्पलर कक्षा 11-12' },
    description:      {
      en: 'NCERT Exemplar problems for Class 11 and 12 Physics. Ideal for JEE and NEET aspirants requiring deeper conceptual clarity.',
      hi: 'कक्षा 11 और 12 भौतिकी के लिए NCERT एग्जेम्पलर प्रश्न। JEE और NEET उम्मीदवारों के लिए आदर्श।',
    },
    author:           'NCERT',
    authorSlug:       'ncert',
    categorySlug:     'science',
    categoryName:     { en: 'Science', hi: 'विज्ञान' },
    subcategorySlug:  'physics',
    subcategoryName:  { en: 'Physics', hi: 'भौतिकी' },
    price: 220, originalPrice: null,
    language: 'en', level: 'school',
    featured: false, status: 'published', badge: 'new',
    rating: 4, reviewCount: 432,
    pages: 310, edition: '2024', isbn: '978-81-19901-11-1',
    coverGradient: ['#1a1a2e', '#16213e'], coverImageUrl: null,
    createdAt: '2024-03-15',
  },
  {
    id: 'book-6',
    slug: 'business-studies-class-11',
    title:            { en: 'Business Studies Class XI', hi: 'व्यावसायिक अध्ययन कक्षा XI' },
    description:      {
      en: 'CBSE aligned Business Studies for Class XI. Covers all chapters with case studies, HOTS questions, and board exam practice.',
      hi: 'कक्षा XI के लिए CBSE संरेखित व्यावसायिक अध्ययन। केस स्टडी, HOTS प्रश्न और बोर्ड परीक्षा अभ्यास।',
    },
    author:           'CBSE Editorial Board',
    authorSlug:       'cbse-editorial',
    categorySlug:     'commerce',
    categoryName:     { en: 'Commerce', hi: 'वाणिज्य' },
    subcategorySlug:  'business-studies',
    subcategoryName:  { en: 'Business Studies', hi: 'व्यावसायिक अध्ययन' },
    price: 310, originalPrice: 380,
    language: 'en', level: 'school',
    featured: false, status: 'published', badge: null,
    rating: 4, reviewCount: 287,
    pages: 420, edition: '2024', isbn: '978-81-19901-33-3',
    coverGradient: ['#2d2d00', '#7a7a00'], coverImageUrl: null,
    createdAt: '2024-02-20',
  },
  {
    id: 'book-7',
    slug: 'sampurn-hindi-vyakaran',
    title:            { en: 'Complete Hindi Grammar & Composition', hi: 'संपूर्ण हिंदी व्याकरण एवं रचना' },
    description:      {
      en: 'The definitive reference for Hindi grammar and composition for students from Class VI through competitive examinations.',
      hi: 'कक्षा VI से प्रतियोगी परीक्षाओं तक के छात्रों के लिए हिंदी व्याकरण और रचना का निश्चित संदर्भ।',
    },
    author:           'Dr. Hardev Bahri',
    authorSlug:       'dr-hardev-bahri',
    categorySlug:     'hindi',
    categoryName:     { en: 'Hindi', hi: 'हिंदी' },
    subcategorySlug:  'hindi-grammar',
    subcategoryName:  { en: 'Hindi Grammar', hi: 'हिंदी व्याकरण' },
    price: 340, originalPrice: 420,
    language: 'hi', level: 'school',
    featured: true, status: 'published', badge: 'bestseller',
    rating: 5, reviewCount: 1102,
    pages: 580, edition: '2023', isbn: '978-81-19901-55-5',
    coverGradient: ['#1e0f23', '#3d1f57'], coverImageUrl: null,
    createdAt: '2024-01-05',
  },
  {
    id: 'book-8',
    slug: 'computer-science-class-11-sumita-arora',
    title:            { en: 'Computer Science with Python Class XI', hi: 'पायथन के साथ कंप्यूटर विज्ञान कक्षा XI' },
    description:      {
      en: 'The most widely used Computer Science textbook for CBSE Class XI with Python programming. Step-by-step coding examples and practicals.',
      hi: 'पायथन प्रोग्रामिंग के साथ CBSE कक्षा XI के लिए सबसे व्यापक रूप से उपयोग की जाने वाली कंप्यूटर विज्ञान पाठ्यपुस्तक।',
    },
    author:           'Sumita Arora',
    authorSlug:       'sumita-arora',
    categorySlug:     'science',
    categoryName:     { en: 'Science', hi: 'विज्ञान' },
    subcategorySlug:  'computer-science',
    subcategoryName:  { en: 'Computer Science', hi: 'कंप्यूटर विज्ञान' },
    price: 395, originalPrice: 480,
    language: 'en', level: 'school',
    featured: false, status: 'published', badge: null,
    rating: 5, reviewCount: 891,
    pages: 640, edition: '2024', isbn: '978-81-19901-77-7',
    coverGradient: ['#1a2a3a', '#2a5a7a'], coverImageUrl: null,
    createdAt: '2024-03-10',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getAllBooks() {
  return books
}

export function getBookBySlug(slug) {
  return books.find(b => b.slug === slug) ?? null
}

export function getFeaturedBooks() {
  return books.filter(b => b.featured && b.status === 'published')
}

export function getRecentBooks(count = 8) {
  return [...books]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, count)
}

/** All books in a top-level category — includes books with any subcategory */
export function getBooksByCategory(categorySlug) {
  return books.filter(
    b => b.categorySlug === categorySlug && b.status === 'published'
  )
}

/** Books in a specific subcategory only */
export function getBooksBySubcategory(subcategorySlug) {
  return books.filter(
    b => b.subcategorySlug === subcategorySlug && b.status === 'published'
  )
}

export function getBooksByLevel(level) {
  if (level === 'all') return books.filter(b => b.status === 'published')
  return books.filter(b => b.level === level && b.status === 'published')
}

export function searchBooks(query) {
  const q = query.toLowerCase().trim()
  if (!q) return books
  return books.filter(b =>
    b.title.en.toLowerCase().includes(q)     ||
    b.title.hi.toLowerCase().includes(q)     ||
    b.author.toLowerCase().includes(q)       ||
    b.categorySlug.includes(q)               ||
    (b.subcategorySlug && b.subcategorySlug.includes(q))
  )
}
