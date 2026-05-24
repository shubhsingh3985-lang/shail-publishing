// app/layout.jsx
//
// Root layout — wraps every page in the app.
// Provides: theme, language context, global fonts, and base metadata.

import { ThemeProvider }   from 'next-themes'
import { Suspense }        from 'react'
import { LanguageProvider } from '@/lib/context/LanguageContext'
import '@/styles/globals.css'

// ─── Site-wide metadata ───────────────────────────────────────────────────────
export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  title: {
    default: 'Shail Publishing & Distributor House',
    template: '%s | Shail Publishing',
  },
  description:
    'India\'s premier educational publisher. Thousands of curated books in Hindi and English for school, college, and competitive examinations.',
  keywords: [
    'educational books',
    'Hindi books',
    'NCERT books',
    'competitive exam books',
    'UPSC books',
    'Shail Publishing',
    'Shail Education Institute',
    'school textbooks India',
  ],
  authors: [{ name: 'Shail Education Institute' }],
  creator: 'Shail Education Institute',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Shail Publishing & Distributor House',
    title: 'Shail Publishing & Distributor House',
    description:
      'Thousands of curated educational books in Hindi and English.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shail Publishing & Distributor House',
    description: 'India\'s premier educational publisher.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      // next-themes adds 'dark' or 'light' class to <html>
      // suppressHydrationWarning prevents mismatch warning from theme injection
      suppressHydrationWarning
    >
      <head>
        {/*
          Google Fonts are loaded in globals.css via @import.
          If you prefer to load via <link> for better LCP, replace
          the @import in globals.css and add the <link> tags here.
        */}
      </head>

      <body>
        {/*
          ThemeProvider from next-themes:
          - attribute="class"  → adds 'dark' class to <html>
          - defaultTheme       → initial theme on first visit
          - enableSystem       → respects OS dark mode preference
          - disableTransitionOnChange → prevents flash during theme switch
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/*
            Suspense is required here because LanguageProvider uses
            useSearchParams() internally, which needs a Suspense boundary
            in Next.js App Router.
          */}
          <Suspense fallback={null}>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}