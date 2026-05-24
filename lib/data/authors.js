// lib/data/authors.js
// Hardcoded author data — active now.
// Firestore version is in lib/firebase/firestore.js (commented out).

export const authors = [
  {
    id: 'author-1',
    slug: 'rd-sharma',
    name: 'R.D. Sharma',
    nameHi: 'आर.डी. शर्मा',
    bio: 'Renowned mathematics educator and author of bestselling textbooks used across India.',
    bioHi: 'प्रसिद्ध गणित शिक्षक और भारत भर में उपयोग की जाने वाली बेस्टसेलिंग पाठ्यपुस्तकों के लेखक।',
    bookCount: 12,
    subjects: ['Mathematics'],
  },
  {
    id: 'author-2',
    slug: 'dr-hardev-bahri',
    name: 'Dr. Hardev Bahri',
    nameHi: 'डॉ. हरदेव बाहरी',
    bio: 'Distinguished Hindi scholar and author of authoritative Hindi grammar and literature references.',
    bioHi: 'प्रतिष्ठित हिंदी विद्वान और हिंदी व्याकरण और साहित्य के प्रामाणिक संदर्भों के लेखक।',
    bookCount: 8,
    subjects: ['Hindi', 'Literature'],
  },
  {
    id: 'author-3',
    slug: 'm-laxmikanth',
    name: 'M. Laxmikanth',
    nameHi: 'एम. लक्ष्मीकांत',
    bio: 'India\'s most trusted author for UPSC preparation, particularly Indian Polity.',
    bioHi: 'UPSC की तैयारी, विशेष रूप से भारतीय राजव्यवस्था के लिए भारत के सबसे विश्वसनीय लेखक।',
    bookCount: 5,
    subjects: ['Political Science', 'Competitive Exams'],
  },
  {
    id: 'author-4',
    slug: 'ncert',
    name: 'NCERT',
    nameHi: 'एनसीईआरटी',
    bio: 'National Council of Educational Research and Training — India\'s apex body for school curriculum.',
    bioHi: 'राष्ट्रीय शैक्षिक अनुसंधान और प्रशिक्षण परिषद — स्कूली पाठ्यक्रम के लिए भारत की शीर्ष संस्था।',
    bookCount: 40,
    subjects: ['All Subjects'],
  },
  {
    id: 'author-5',
    slug: 'sumita-arora',
    name: 'Sumita Arora',
    nameHi: 'सुमिता अरोड़ा',
    bio: 'Leading author of Computer Science textbooks for CBSE curriculum.',
    bioHi: 'CBSE पाठ्यक्रम के लिए कंप्यूटर साइंस पाठ्यपुस्तकों की प्रमुख लेखिका।',
    bookCount: 6,
    subjects: ['Computer Science'],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getAllAuthors() {
  return authors
}

export function getAuthorBySlug(slug) {
  return authors.find(a => a.slug === slug) ?? null
}
