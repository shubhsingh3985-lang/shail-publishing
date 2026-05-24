// lib/data/categories.js
// Hardcoded category + subcategory data — active now.
// Firestore version: lib/firebase/firestore.js (commented out).
//
// Structure:
//   parentSlug: null  → top-level category
//   parentSlug: "science" → subcategory of Science

export const categories = [

  // ─── TOP-LEVEL CATEGORIES ────────────────────────────────────────────────

  {
    id: 'cat-1', slug: 'mathematics', parentSlug: null, parentName: null,
    name:        { en: 'Mathematics',       hi: 'गणित'              },
    description: {
      en: 'Textbooks, guides, and practice books for all levels of mathematics.',
      hi: 'गणित के सभी स्तरों के लिए पाठ्यपुस्तकें, गाइड और अभ्यास पुस्तकें।',
    },
    icon: '🔢', color: '#C41E3A', bookCount: 1240,
  },
  {
    id: 'cat-2', slug: 'science', parentSlug: null, parentName: null,
    name:        { en: 'Science',           hi: 'विज्ञान'            },
    description: {
      en: 'Physics, Chemistry, Biology, and integrated science books.',
      hi: 'भौतिकी, रसायन विज्ञान, जीव विज्ञान और एकीकृत विज्ञान पुस्तकें।',
    },
    icon: '🔬', color: '#2563EB', bookCount: 980,
  },
  {
    id: 'cat-3', slug: 'history', parentSlug: null, parentName: null,
    name:        { en: 'History',           hi: 'इतिहास'             },
    description: {
      en: 'Indian and World history books for school and competitive exams.',
      hi: 'स्कूल और प्रतियोगी परीक्षाओं के लिए भारतीय और विश्व इतिहास पुस्तकें।',
    },
    icon: '📜', color: '#059669', bookCount: 650,
  },
  {
    id: 'cat-4', slug: 'hindi', parentSlug: null, parentName: null,
    name:        { en: 'Hindi',             hi: 'हिंदी'              },
    description: {
      en: 'Hindi grammar, literature, poetry, and language learning books.',
      hi: 'हिंदी व्याकरण, साहित्य, कविता और भाषा सीखने की पुस्तकें।',
    },
    icon: '🗣️', color: '#7C3AED', bookCount: 890,
  },
  {
    id: 'cat-5', slug: 'english', parentSlug: null, parentName: null,
    name:        { en: 'English',           hi: 'अंग्रेजी'           },
    description: {
      en: 'English grammar, literature, and communication skills books.',
      hi: 'अंग्रेजी व्याकरण, साहित्य और संचार कौशल पुस्तकें।',
    },
    icon: '🌐', color: '#D97706', bookCount: 760,
  },
  {
    id: 'cat-6', slug: 'competitive', parentSlug: null, parentName: null,
    name:        { en: 'Competitive Exams', hi: 'प्रतियोगी परीक्षाएं' },
    description: {
      en: 'UPSC, SSC, Bank PO, NEET, JEE, and state exam preparation books.',
      hi: 'UPSC, SSC, बैंक PO, NEET, JEE और राज्य परीक्षा की तैयारी की पुस्तकें।',
    },
    icon: '🏛️', color: '#DC2626', bookCount: 1100,
  },
  {
    id: 'cat-7', slug: 'commerce', parentSlug: null, parentName: null,
    name:        { en: 'Commerce',          hi: 'वाणिज्य'            },
    description: {
      en: 'Accountancy, Business Studies, Economics, and finance books.',
      hi: 'लेखांकन, व्यावसायिक अध्ययन, अर्थशास्त्र और वित्त पुस्तकें।',
    },
    icon: '💼', color: '#0891B2', bookCount: 520,
  },
  {
    id: 'cat-8', slug: 'arts', parentSlug: null, parentName: null,
    name:        { en: 'Arts & Humanities', hi: 'कला एवं मानविकी'   },
    description: {
      en: 'Geography, Sociology, Psychology, and fine arts books.',
      hi: 'भूगोल, समाजशास्त्र, मनोविज्ञान और ललित कला पुस्तकें।',
    },
    icon: '🎨', color: '#BE185D', bookCount: 340,
  },

  // ─── MATHEMATICS SUBCATEGORIES ────────────────────────────────────────────

  {
    id: 'sub-m-1', slug: 'algebra', parentSlug: 'mathematics',
    parentName: { en: 'Mathematics', hi: 'गणित' },
    name:        { en: 'Algebra',              hi: 'बीजगणित'        },
    description: { en: 'Linear algebra, polynomials, equations.', hi: 'रेखीय बीजगणित, बहुपद, समीकरण।' },
    icon: '➕', color: '#C41E3A', bookCount: 320,
  },
  {
    id: 'sub-m-2', slug: 'calculus', parentSlug: 'mathematics',
    parentName: { en: 'Mathematics', hi: 'गणित' },
    name:        { en: 'Calculus',             hi: 'कलन'            },
    description: { en: 'Differential and integral calculus.', hi: 'अवकल और समाकल कलन।' },
    icon: '∫', color: '#C41E3A', bookCount: 280,
  },
  {
    id: 'sub-m-3', slug: 'statistics', parentSlug: 'mathematics',
    parentName: { en: 'Mathematics', hi: 'गणित' },
    name:        { en: 'Statistics & Probability', hi: 'सांख्यिकी एवं प्रायिकता' },
    description: { en: 'Statistics, probability, and data analysis.', hi: 'सांख्यिकी, प्रायिकता और डेटा विश्लेषण।' },
    icon: '📊', color: '#C41E3A', bookCount: 210,
  },
  {
    id: 'sub-m-4', slug: 'geometry', parentSlug: 'mathematics',
    parentName: { en: 'Mathematics', hi: 'गणित' },
    name:        { en: 'Geometry & Trigonometry', hi: 'ज्यामिति एवं त्रिकोणमिति' },
    description: { en: 'Euclidean geometry, coordinate geometry, trigonometry.', hi: 'यूक्लिडीय ज्यामिति, निर्देशांक ज्यामिति, त्रिकोणमिति।' },
    icon: '📐', color: '#C41E3A', bookCount: 195,
  },
  {
    id: 'sub-m-5', slug: 'arithmetic', parentSlug: 'mathematics',
    parentName: { en: 'Mathematics', hi: 'गणित' },
    name:        { en: 'Arithmetic',           hi: 'अंकगणित'        },
    description: { en: 'Number systems, fractions, percentages, basic arithmetic.', hi: 'संख्या पद्धति, भिन्न, प्रतिशत, सामान्य अंकगणित।' },
    icon: '🔢', color: '#C41E3A', bookCount: 235,
  },

  // ─── SCIENCE SUBCATEGORIES ────────────────────────────────────────────────

  {
    id: 'sub-s-1', slug: 'physics', parentSlug: 'science',
    parentName: { en: 'Science', hi: 'विज्ञान' },
    name:        { en: 'Physics',              hi: 'भौतिकी'          },
    description: { en: 'Mechanics, electricity, optics, modern physics.', hi: 'यांत्रिकी, विद्युत, प्रकाशिकी, आधुनिक भौतिकी।' },
    icon: '⚡', color: '#2563EB', bookCount: 310,
  },
  {
    id: 'sub-s-2', slug: 'chemistry', parentSlug: 'science',
    parentName: { en: 'Science', hi: 'विज्ञान' },
    name:        { en: 'Chemistry',            hi: 'रसायन विज्ञान'   },
    description: { en: 'Organic, inorganic, and physical chemistry.', hi: 'कार्बनिक, अकार्बनिक और भौतिक रसायन।' },
    icon: '🧪', color: '#2563EB', bookCount: 290,
  },
  {
    id: 'sub-s-3', slug: 'biology', parentSlug: 'science',
    parentName: { en: 'Science', hi: 'विज्ञान' },
    name:        { en: 'Biology',              hi: 'जीव विज्ञान'     },
    description: { en: 'Botany, zoology, genetics, ecology, and human physiology.', hi: 'वनस्पति विज्ञान, प्राणी विज्ञान, आनुवंशिकी, पारिस्थितिकी।' },
    icon: '🧬', color: '#2563EB', bookCount: 245,
  },
  {
    id: 'sub-s-4', slug: 'computer-science', parentSlug: 'science',
    parentName: { en: 'Science', hi: 'विज्ञान' },
    name:        { en: 'Computer Science',     hi: 'कंप्यूटर विज्ञान' },
    description: { en: 'Programming, data structures, algorithms, and IT concepts.', hi: 'प्रोग्रामिंग, डेटा संरचना, एल्गोरिदम और IT अवधारणाएं।' },
    icon: '💻', color: '#2563EB', bookCount: 135,
  },

  // ─── HISTORY SUBCATEGORIES ────────────────────────────────────────────────

  {
    id: 'sub-h-1', slug: 'ancient-history', parentSlug: 'history',
    parentName: { en: 'History', hi: 'इतिहास' },
    name:        { en: 'Ancient History',      hi: 'प्राचीन इतिहास'  },
    description: { en: 'Indus Valley, Vedic period, Mauryas, Guptas.', hi: 'सिंधु घाटी, वैदिक काल, मौर्य, गुप्त।' },
    icon: '🏛️', color: '#059669', bookCount: 180,
  },
  {
    id: 'sub-h-2', slug: 'medieval-history', parentSlug: 'history',
    parentName: { en: 'History', hi: 'इतिहास' },
    name:        { en: 'Medieval History',     hi: 'मध्यकालीन इतिहास' },
    description: { en: 'Delhi Sultanate, Mughal Empire, Vijayanagara.', hi: 'दिल्ली सल्तनत, मुगल साम्राज्य, विजयनगर।' },
    icon: '🕌', color: '#059669', bookCount: 210,
  },
  {
    id: 'sub-h-3', slug: 'modern-history', parentSlug: 'history',
    parentName: { en: 'History', hi: 'इतिहास' },
    name:        { en: 'Modern History',       hi: 'आधुनिक इतिहास'   },
    description: { en: 'British colonial period and Indian Independence.', hi: 'ब्रिटिश औपनिवेशिक काल और भारतीय स्वतंत्रता।' },
    icon: '🇮🇳', color: '#059669', bookCount: 165,
  },
  {
    id: 'sub-h-4', slug: 'world-history', parentSlug: 'history',
    parentName: { en: 'History', hi: 'इतिहास' },
    name:        { en: 'World History',        hi: 'विश्व इतिहास'    },
    description: { en: 'World wars, revolutions, and global political history.', hi: 'विश्व युद्ध, क्रांतियाँ और वैश्विक राजनीतिक इतिहास।' },
    icon: '🌍', color: '#059669', bookCount: 95,
  },

  // ─── HINDI SUBCATEGORIES ──────────────────────────────────────────────────

  {
    id: 'sub-hi-1', slug: 'hindi-grammar', parentSlug: 'hindi',
    parentName: { en: 'Hindi', hi: 'हिंदी' },
    name:        { en: 'Hindi Grammar',        hi: 'हिंदी व्याकरण'   },
    description: { en: 'Grammar, composition, and language rules.', hi: 'व्याकरण, रचना और भाषा नियम।' },
    icon: '✍️', color: '#7C3AED', bookCount: 290,
  },
  {
    id: 'sub-hi-2', slug: 'hindi-literature', parentSlug: 'hindi',
    parentName: { en: 'Hindi', hi: 'हिंदी' },
    name:        { en: 'Hindi Literature',     hi: 'हिंदी साहित्य'   },
    description: { en: 'Prose, fiction, essays, and literary criticism.', hi: 'गद्य, कथा साहित्य, निबंध और साहित्यिक समीक्षा।' },
    icon: '📚', color: '#7C3AED', bookCount: 340,
  },
  {
    id: 'sub-hi-3', slug: 'hindi-poetry', parentSlug: 'hindi',
    parentName: { en: 'Hindi', hi: 'हिंदी' },
    name:        { en: 'Hindi Poetry',         hi: 'हिंदी काव्य'     },
    description: { en: 'Classical and modern Hindi poetry collections.', hi: 'शास्त्रीय और आधुनिक हिंदी काव्य संग्रह।' },
    icon: '🖋️', color: '#7C3AED', bookCount: 260,
  },

  // ─── ENGLISH SUBCATEGORIES ────────────────────────────────────────────────

  {
    id: 'sub-en-1', slug: 'english-grammar', parentSlug: 'english',
    parentName: { en: 'English', hi: 'अंग्रेजी' },
    name:        { en: 'English Grammar',      hi: 'अंग्रेजी व्याकरण' },
    description: { en: 'Grammar rules, usage, and writing skills.', hi: 'व्याकरण नियम, उपयोग और लेखन कौशल।' },
    icon: '📝', color: '#D97706', bookCount: 310,
  },
  {
    id: 'sub-en-2', slug: 'english-literature', parentSlug: 'english',
    parentName: { en: 'English', hi: 'अंग्रेजी' },
    name:        { en: 'English Literature',   hi: 'अंग्रेजी साहित्य' },
    description: { en: 'Prose, poetry, drama, and literary analysis.', hi: 'गद्य, कविता, नाटक और साहित्यिक विश्लेषण।' },
    icon: '🎭', color: '#D97706', bookCount: 240,
  },
  {
    id: 'sub-en-3', slug: 'communication-skills', parentSlug: 'english',
    parentName: { en: 'English', hi: 'अंग्रेजी' },
    name:        { en: 'Communication Skills', hi: 'संचार कौशल'      },
    description: { en: 'Spoken English, business communication, and soft skills.', hi: 'बोली जाने वाली अंग्रेजी, व्यावसायिक संचार और सॉफ्ट स्किल्स।' },
    icon: '🗣️', color: '#D97706', bookCount: 210,
  },

  // ─── COMPETITIVE EXAM SUBCATEGORIES ──────────────────────────────────────

  {
    id: 'sub-c-1', slug: 'upsc', parentSlug: 'competitive',
    parentName: { en: 'Competitive Exams', hi: 'प्रतियोगी परीक्षाएं' },
    name:        { en: 'UPSC Civil Services', hi: 'UPSC सिविल सेवा'  },
    description: { en: 'IAS, IPS, IFS prelims, mains, and interview preparation.', hi: 'IAS, IPS, IFS प्रारंभिक, मुख्य और साक्षात्कार की तैयारी।' },
    icon: '🏅', color: '#DC2626', bookCount: 380,
  },
  {
    id: 'sub-c-2', slug: 'ssc', parentSlug: 'competitive',
    parentName: { en: 'Competitive Exams', hi: 'प्रतियोगी परीक्षाएं' },
    name:        { en: 'SSC Exams',            hi: 'SSC परीक्षाएं'   },
    description: { en: 'SSC CGL, CHSL, MTS, and other Staff Selection Commission exams.', hi: 'SSC CGL, CHSL, MTS और अन्य परीक्षाएं।' },
    icon: '📋', color: '#DC2626', bookCount: 220,
  },
  {
    id: 'sub-c-3', slug: 'banking', parentSlug: 'competitive',
    parentName: { en: 'Competitive Exams', hi: 'प्रतियोगी परीक्षाएं' },
    name:        { en: 'Banking & Finance',    hi: 'बैंकिंग एवं वित्त' },
    description: { en: 'IBPS PO, SBI PO, RBI, and other banking exam prep.', hi: 'IBPS PO, SBI PO, RBI और अन्य बैंकिंग परीक्षाएं।' },
    icon: '🏦', color: '#DC2626', bookCount: 195,
  },
  {
    id: 'sub-c-4', slug: 'neet', parentSlug: 'competitive',
    parentName: { en: 'Competitive Exams', hi: 'प्रतियोगी परीक्षाएं' },
    name:        { en: 'NEET',                 hi: 'NEET'             },
    description: { en: 'Medical entrance exam preparation — Biology, Physics, Chemistry.', hi: 'मेडिकल प्रवेश परीक्षा — जीव विज्ञान, भौतिकी, रसायन।' },
    icon: '🩺', color: '#DC2626', bookCount: 175,
  },
  {
    id: 'sub-c-5', slug: 'jee', parentSlug: 'competitive',
    parentName: { en: 'Competitive Exams', hi: 'प्रतियोगी परीक्षाएं' },
    name:        { en: 'JEE Mains & Advanced', hi: 'JEE मेन्स एवं एडवांस्ड' },
    description: { en: 'Engineering entrance exam prep — Maths, Physics, Chemistry.', hi: 'इंजीनियरिंग प्रवेश परीक्षा — गणित, भौतिकी, रसायन।' },
    icon: '⚙️', color: '#DC2626', bookCount: 130,
  },

  // ─── COMMERCE SUBCATEGORIES ───────────────────────────────────────────────

  {
    id: 'sub-co-1', slug: 'accountancy', parentSlug: 'commerce',
    parentName: { en: 'Commerce', hi: 'वाणिज्य' },
    name:        { en: 'Accountancy',          hi: 'लेखांकन'         },
    description: { en: 'Financial accounting, cost accounting, and auditing.', hi: 'वित्तीय लेखांकन, लागत लेखांकन और लेखापरीक्षा।' },
    icon: '📒', color: '#0891B2', bookCount: 195,
  },
  {
    id: 'sub-co-2', slug: 'business-studies', parentSlug: 'commerce',
    parentName: { en: 'Commerce', hi: 'वाणिज्य' },
    name:        { en: 'Business Studies',     hi: 'व्यावसायिक अध्ययन' },
    description: { en: 'Management, marketing, finance, and business organisation.', hi: 'प्रबंधन, विपणन, वित्त और व्यावसायिक संगठन।' },
    icon: '📈', color: '#0891B2', bookCount: 185,
  },
  {
    id: 'sub-co-3', slug: 'economics', parentSlug: 'commerce',
    parentName: { en: 'Commerce', hi: 'वाणिज्य' },
    name:        { en: 'Economics',            hi: 'अर्थशास्त्र'     },
    description: { en: 'Micro and macro economics, Indian economy.', hi: 'सूक्ष्म और व्यष्टि अर्थशास्त्र, भारतीय अर्थव्यवस्था।' },
    icon: '💹', color: '#0891B2', bookCount: 140,
  },

  // ─── ARTS SUBCATEGORIES ───────────────────────────────────────────────────

  {
    id: 'sub-a-1', slug: 'geography', parentSlug: 'arts',
    parentName: { en: 'Arts & Humanities', hi: 'कला एवं मानविकी' },
    name:        { en: 'Geography',            hi: 'भूगोल'           },
    description: { en: 'Physical, human, and Indian geography.', hi: 'भौतिक, मानव और भारतीय भूगोल।' },
    icon: '🗺️', color: '#BE185D', bookCount: 120,
  },
  {
    id: 'sub-a-2', slug: 'sociology', parentSlug: 'arts',
    parentName: { en: 'Arts & Humanities', hi: 'कला एवं मानविकी' },
    name:        { en: 'Sociology',            hi: 'समाजशास्त्र'     },
    description: { en: 'Society, culture, social institutions, and Indian sociology.', hi: 'समाज, संस्कृति, सामाजिक संस्थाएं और भारतीय समाजशास्त्र।' },
    icon: '👥', color: '#BE185D', bookCount: 95,
  },
  {
    id: 'sub-a-3', slug: 'psychology', parentSlug: 'arts',
    parentName: { en: 'Arts & Humanities', hi: 'कला एवं मानविकी' },
    name:        { en: 'Psychology',           hi: 'मनोविज्ञान'      },
    description: { en: 'Human behaviour, cognitive psychology, and mental health.', hi: 'मानव व्यवहार, संज्ञानात्मक मनोविज्ञान और मानसिक स्वास्थ्य।' },
    icon: '🧠', color: '#BE185D', bookCount: 80,
  },
  {
    id: 'sub-a-4', slug: 'political-science', parentSlug: 'arts',
    parentName: { en: 'Arts & Humanities', hi: 'कला एवं मानविकी' },
    name:        { en: 'Political Science',    hi: 'राजनीति विज्ञान' },
    description: { en: 'Indian constitution, governance, political theory.', hi: 'भारतीय संविधान, शासन और राजनीतिक सिद्धांत।' },
    icon: '⚖️', color: '#BE185D', bookCount: 45,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** All categories — both top-level and subcategories */
export function getAllCategories() {
  return categories
}

/** Top-level categories only (parentSlug === null) */
export function getTopLevelCategories() {
  return categories.filter(c => c.parentSlug === null)
}

/** Subcategories of a given parent slug */
export function getSubcategories(parentSlug) {
  return categories.filter(c => c.parentSlug === parentSlug)
}

/** Full category tree — each top-level category includes its subcategories array */
export function getCategoryTree() {
  return getTopLevelCategories().map(cat => ({
    ...cat,
    subcategories: getSubcategories(cat.slug),
  }))
}

/** Single category by slug — works for both top-level and subcategories */
export function getCategoryBySlug(slug) {
  return categories.find(c => c.slug === slug) ?? null
}
