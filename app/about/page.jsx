'use client'

import Header          from '@/components/layout/Header'
import Footer          from '@/components/layout/Footer'
import { useLanguage } from '@/lib/context/LanguageContext'
import { cn }          from '@/lib/utils/cn'
import { BookOpen, Award, Users, Globe } from 'lucide-react'

const PILLARS = [
  {
    icon: BookOpen,
    titleEn: 'Quality Content',     titleHi: 'गुणवत्तापूर्ण सामग्री',
    descEn:  'Every book is curated and reviewed by subject matter experts before publication.',
    descHi:  'प्रकाशन से पहले हर पुस्तक की विशेषज्ञों द्वारा समीक्षा की जाती है।',
  },
  {
    icon: Globe,
    titleEn: 'Bilingual Approach',  titleHi: 'द्विभाषी दृष्टिकोण',
    descEn:  'We believe language should never be a barrier to learning. Our catalogue spans both Hindi and English.',
    descHi:  'हमारा मानना है कि भाषा सीखने में बाधा नहीं बननी चाहिए। हमारी सूची हिंदी और अंग्रेजी दोनों में है।',
  },
  {
    icon: Users,
    titleEn: 'Student-First',       titleHi: 'छात्र-प्राथमिक',
    descEn:  'Affordable pricing, accessible formats, and curriculum-aligned content designed for Indian students.',
    descHi:  'भारतीय छात्रों के लिए किफायती मूल्य, सुलभ प्रारूप और पाठ्यक्रम-संरेखित सामग्री।',
  },
  {
    icon: Award,
    titleEn: '25+ Years of Trust',  titleHi: '25+ वर्षों का विश्वास',
    descEn:  'Established in 1999, Shail Education Institute has been a trusted name for over two decades.',
    descHi:  '1999 में स्थापित, शैल एजुकेशन इंस्टीट्यूट दो दशकों से एक विश्वसनीय नाम रहा है।',
  },
]

export default function AboutPage() {
  const { isHindi } = useLanguage()

  return (
    <>
      <Header />
      <main>

        {/* Hero */}
        <section
          className="py-16 border-b text-center"
          style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}
        >
          <div className="page-container max-w-content">
            <p className="section-label mb-3">{isHindi ? 'हमारी कहानी' : 'Our Story'}</p>
            <h1
              className={cn('font-serif text-4xl sm:text-5xl font-bold mb-4', isHindi && 'font-hindi')}
              style={{ color: 'var(--color-text-primary)' }}
            >
              {isHindi ? 'भारत भर में शिक्षार्थियों को सशक्त बनाना' : 'Empowering Learners Across India'}
            </h1>
            <p
              className={cn('text-base leading-relaxed max-w-xl mx-auto', isHindi && 'font-hindi')}
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {isHindi
                ? '1999 से, शैल एजुकेशन इंस्टीट्यूट शैक्षिक प्रकाशन में एक विश्वसनीय नाम रहा है।'
                : 'Since 1999, Shail Education Institute has been a trusted name in educational publishing, serving students from Class I through postgraduate levels.'}
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-pad" style={{ background: 'var(--color-page)' }}>
          <div className="page-container max-w-content">
            <div className="grid md:grid-cols-2 gap-6">

              <div
                className="card p-8"
                style={{ borderLeft: '4px solid var(--color-gold)' }}
              >
                <p className="section-label mb-3">{isHindi ? 'हमारा मिशन' : 'Our Mission'}</p>
                <h2
                  className={cn('font-serif text-2xl font-bold mb-4', isHindi && 'font-hindi')}
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {isHindi ? 'ज्ञान सबके लिए' : 'Knowledge for Everyone'}
                </h2>
                <p
                  className={cn('text-sm leading-relaxed', isHindi && 'font-hindi')}
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {isHindi
                    ? 'भारत के हर छात्र को गुणवत्तापूर्ण शैक्षिक संसाधन उनकी पसंदीदा भाषा में उपलब्ध कराना — चाहे वह स्कूल स्तर हो, कॉलेज स्तर हो, या प्रतियोगी परीक्षाएं।'
                    : 'To make quality educational resources accessible to every student across India, in the language they are most comfortable with — whether at school, college, or competitive exam level.'}
                </p>
              </div>

              <div
                className="card p-8"
                style={{ borderLeft: '4px solid var(--color-crimson)' }}
              >
                <p
                  className="text-2xs font-bold tracking-widest uppercase mb-3"
                  style={{ color: 'var(--color-crimson)' }}
                >
                  {isHindi ? 'हमारी दृष्टि' : 'Our Vision'}
                </p>
                <h2
                  className={cn('font-serif text-2xl font-bold mb-4', isHindi && 'font-hindi')}
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {isHindi ? 'भाषा कोई बाधा नहीं' : 'No Language Barrier'}
                </h2>
                <p
                  className={cn('text-sm leading-relaxed', isHindi && 'font-hindi')}
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {isHindi
                    ? 'एक ऐसा भारत जहाँ भाषा कभी सीखने में बाधा न बने। जहाँ हर छात्र अपनी मातृभाषा में उच्च गुणवत्ता की शिक्षा पा सके।'
                    : 'An India where language is never a barrier to learning — where every student can access high-quality education in their mother tongue.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="section-pad" style={{ background: 'var(--color-card)' }}>
          <div className="page-container max-w-content">
            <div className="text-center mb-10">
              <p className="section-label mb-2">{isHindi ? 'हमारे मूल्य' : 'What We Stand For'}</p>
              <h2
                className={cn('font-serif text-3xl font-bold', isHindi && 'font-hindi')}
                style={{ color: 'var(--color-text-primary)' }}
              >
                {isHindi ? 'हमारे मूल्य' : 'Our Core Pillars'}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PILLARS.map((p, i) => (
                <div key={i} className="card p-5 text-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(201,162,39,0.1)', color: 'var(--color-gold)' }}
                  >
                    <p.icon size={22} />
                  </div>
                  <h3
                    className={cn('font-serif text-base font-bold mb-2', isHindi && 'font-hindi')}
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {isHindi ? p.titleHi : p.titleEn}
                  </h3>
                  <p
                    className={cn('text-xs leading-relaxed', isHindi && 'font-hindi')}
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {isHindi ? p.descHi : p.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}