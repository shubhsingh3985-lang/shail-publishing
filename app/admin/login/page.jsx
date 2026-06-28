'use client'

// app/admin/login/page.jsx

import { Suspense, useState }              from 'react'
import { useRouter, useSearchParams }      from 'next/navigation'
import {
  Lock, Eye, EyeOff, ArrowRight,
  ShieldCheck, Loader2,
} from 'lucide-react'

function LoginForm() {
  const router       = useRouter()
  const searchParams  = useSearchParams()
  const from          = searchParams.get('from') || '/admin'

  const [key,      setKey]      = useState('')
  const [showKey,  setShowKey]  = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!key.trim() || loading) return

    setLoading(true)
    setError('')

    try {
      const res  = await fetch('/api/admin/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ key }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Invalid admin key. Please try again.')
        setLoading(false)
        return
      }

      // Full navigation so middleware re-evaluates with the new cookie
      window.location.href = from
    } catch {
      setError('Something went wrong. Please check your connection and try again.')
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: '#0F0E0D' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,162,39,0.10) 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-sm relative z-10">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border-2 mb-4"
            style={{ background: '#0F0E0D', borderColor: '#C9A227' }}
          >
            <span className="text-sm font-bold tracking-tight" style={{ color: '#D4FF00' }}>S3</span>
          </div>
          <h1
            className="font-serif text-2xl font-black tracking-widest"
            style={{ color: '#C9A227', fontFamily: "'Playfair Display', serif" }}
          >
            SHAIL
          </h1>
          <p
            className="text-[10px] tracking-[0.2em] uppercase mt-1.5"
            style={{ color: 'rgba(247,244,239,0.4)' }}
          >
            Admin Portal
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-7 sm:p-8"
          style={{ background: '#1A1917', border: '1px solid rgba(201,162,39,0.18)' }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldCheck size={17} style={{ color: '#C9A227' }} />
            <h2 className="text-base font-semibold" style={{ color: '#F0EDE6' }}>
              Admin Access
            </h2>
          </div>
          <p className="text-sm mb-6" style={{ color: 'rgba(240,237,230,0.5)' }}>
            Enter your admin key to continue
          </p>

          {/* Error message */}
          {error && (
            <div
              className="mb-4 px-3.5 py-2.5 rounded-lg text-xs leading-relaxed"
              style={{
                background: 'rgba(196,30,58,0.1)',
                border:     '1px solid rgba(196,30,58,0.3)',
                color:      '#E8536A',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Key input */}
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'rgba(240,237,230,0.3)' }}
              />
              <input
                type={showKey ? 'text' : 'password'}
                value={key}
                onChange={e => setKey(e.target.value)}
                placeholder="Enter admin key"
                autoFocus
                autoComplete="off"
                disabled={loading}
                className="w-full pl-10 pr-10 py-3 rounded-lg text-sm outline-none transition-all disabled:opacity-60"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border:     '1px solid rgba(255,255,255,0.1)',
                  color:      '#F0EDE6',
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(201,162,39,0.5)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
              />
              <button
                type="button"
                onClick={() => setShowKey(v => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'rgba(240,237,230,0.4)' }}
                tabIndex={-1}
                aria-label={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !key.trim()}
              className="flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: '#C9A227', color: '#0F0E0D' }}
            >
              {loading
                ? <><Loader2 size={15} className="animate-spin" /> Verifying...</>
                : <>Login <ArrowRight size={15} /></>
              }
            </button>
          </form>
        </div>

        <p
          className="text-center text-[11px] mt-6 leading-relaxed"
          style={{ color: 'rgba(240,237,230,0.3)' }}
        >
          Authorized personnel only. All access attempts are logged.
        </p>
      </div>
    </div>
  )
}

// useSearchParams() requires a Suspense boundary in the App Router
export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
