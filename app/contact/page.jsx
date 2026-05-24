'use client'

import Header          from '@/components/layout/Header'
import Footer          from '@/components/layout/Footer'
import { useLanguage } from '@/lib/context/LanguageContext'
import { cn }          from '@/lib/utils/cn'
import { useState }    from 'react'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

const CONTACT_INFO = [
  {
    icon: MapPin,
    labelEn: 'Address',
    labelHi: 'पता',
    valueEn: 'Shail Education Institute, Near Civil Lines, Allahabad, Uttar Pradesh — 211001',
    valueHi: 'शैल एजुकेशन इंस्टीट्यूट, सिविल लाइन्स के पास, प्रयागराज, उत्तर प्रदेश — 211001',
  },
  {
    icon: Phone,
    labelEn: 'Phone',
    labelHi: 'फ़ोन',
    valueEn: '+91 98765 43210',
    valueHi: '+91 98765 43210',
  },
  {
    icon: Mail,
    labelEn: 'Email',
    labelHi: 'ईमेल',
    valueEn: 'info@shailpublishing.in',
    valueHi: 'info@shailpublishing.in',
  },
  {
    icon: Clock,
    labelEn: 'Working Hours',
    labelHi: 'कार्य समय',
    valueEn: 'Monday – Saturday: 9:00 AM – 6:00 PM',
    valueHi: 'सोमवार – शनिवार: सुबह 9:00 – शाम 6:00',
  },
]

export default function ContactPage() {
  const { isHindi } = useLanguage()

  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus]   = useState(null) // 'success' | 'error' | null
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    // Simulate sending — replace with your email API (EmailJS, Resend, etc.)
    await new Promise(r => setTimeout(r, 1000))
    setStatus('success')
    setLoading(false)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <>
      <Header />
      <main>

        {/* Page hero */}
        <section
          className="py-12 border-b"
          style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)' }}
        >
          <div className="page-container text-center">
            <p className="section-label mb-2">{isHindi ? 'संपर्क करें' : 'Get in Touch'}</p>
            <h1
              className={cn('font-serif text-4xl font-bold mb-3', isHindi && 'font-hindi')}
              style={{ color: 'var(--color-text-primary)' }}
            >
              {isHindi ? 'संपर्क करें' : 'Contact Us'}
            </h1>
            <p
              className={cn('text-base max-w-md mx-auto', isHindi && 'font-hindi')}
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {isHindi
                ? 'हम आपसे सुनना चाहते हैं। कोई भी प्रश्न, सुझाव या थोक ऑर्डर के लिए संपर्क करें।'
                : 'Have a question, suggestion, or bulk order enquiry? We\'d love to hear from you.'}
            </p>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-container">
            <div className="grid lg:grid-cols-2 gap-10">

              {/* Contact form */}
              <div
                className="card p-6 sm:p-8"
                style={{ background: 'var(--color-card)' }}
              >
                <h2
                  className={cn('font-serif text-xl font-bold mb-6', isHindi && 'font-hindi')}
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {isHindi ? 'संदेश भेजें' : 'Send a Message'}
                </h2>

                {status === 'success' && (
                  <div
                    className={cn('p-4 rounded-lg mb-6 text-sm', isHindi && 'font-hindi')}
                    style={{ background: 'rgba(5,150,105,0.1)', color: '#059669', border: '1px solid rgba(5,150,105,0.2)' }}
                  >
                    {isHindi
                      ? '✓ आपका संदेश भेज दिया गया है। हम जल्द संपर्क करेंगे!'
                      : '✓ Your message has been sent. We\'ll get back to you soon!'}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={cn('form-label', isHindi && 'font-hindi')}>
                        {isHindi ? 'आपका नाम' : 'Your Name'}
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder={isHindi ? 'नाम दर्ज करें' : 'Enter your name'}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Email</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={cn('form-label', isHindi && 'font-hindi')}>
                      {isHindi ? 'विषय' : 'Subject'}
                    </label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="form-input"
                      placeholder={isHindi ? 'विषय लिखें' : 'What is this about?'}
                    />
                  </div>

                  <div>
                    <label className={cn('form-label', isHindi && 'font-hindi')}>
                      {isHindi ? 'संदेश' : 'Message'}
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className="form-input resize-none"
                      placeholder={isHindi ? 'अपना संदेश यहाँ लिखें...' : 'Write your message here...'}
                      required
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={cn(
                      'btn-primary w-full justify-center gap-2',
                      loading && 'opacity-70 cursor-not-allowed'
                    )}
                  >
                    <Send size={15} />
                    {loading
                      ? (isHindi ? 'भेजा जा रहा है...' : 'Sending...')
                      : (isHindi ? 'संदेश भेजें' : 'Send Message')
                    }
                  </button>
                </div>
              </div>

              {/* Contact info */}
              <div className="flex flex-col gap-4">
                {CONTACT_INFO.map((item, i) => (
                  <div
                    key={i}
                    className="card p-5 flex gap-4 items-start"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(201,162,39,0.1)', color: 'var(--color-gold)' }}
                    >
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p
                        className={cn('text-xs font-semibold tracking-wide uppercase mb-1', isHindi && 'font-hindi')}
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {isHindi ? item.labelHi : item.labelEn}
                      </p>
                      <p
                        className={cn('text-sm', isHindi && 'font-hindi')}
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {isHindi ? item.valueHi : item.valueEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}