/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],

  // Dark mode is controlled by the <html> class (set by next-themes)
  darkMode: 'class',

  theme: {
    extend: {
      // ─── Brand Colors ───────────────────────────────────────────────
      colors: {
        brand: {
          gold: '#C9A227',
          'gold-light': '#E8C04A',
          'gold-dark': '#A07A10',
          crimson: '#C41E3A',
          'crimson-light': '#E03050',
          'crimson-dark': '#8B1228',
          black: '#0F0E0D',
        },
        // Light theme surface palette
        surface: {
          page: '#F7F4EF',
          card: '#FFFFFF',
          raised: '#F0EDE6',
          border: '#E0D9CE',
          'border-strong': '#C8BFB0',
        },
        // Dark theme surface palette (referenced via CSS variables in globals.css)
        dark: {
          page: '#0F0E0D',
          card: '#1A1917',
          raised: '#242220',
          border: '#2E2B27',
          'border-strong': '#3D3930',
        },
        // Text palette
        ink: {
          primary: '#0F0E0D',
          secondary: '#5C5750',
          muted: '#9C9589',
          inverted: '#F7F4EF',
        },
      },

      // ─── Typography ─────────────────────────────────────────────────
      fontFamily: {
        // Display / headings
        serif: ['Playfair Display', 'Georgia', 'serif'],
        // Body / UI
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        // Hindi text
        devanagari: ['Noto Sans Devanagari', 'DM Sans', 'sans-serif'],
        // Monospace (admin code blocks)
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },

      fontSize: {
        '2xs': ['10px', { lineHeight: '14px' }],
        xs: ['11px', { lineHeight: '16px' }],
        sm: ['13px', { lineHeight: '20px' }],
        base: ['15px', { lineHeight: '24px' }],
        lg: ['17px', { lineHeight: '26px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '38px' }],
        '4xl': ['38px', { lineHeight: '46px' }],
        '5xl': ['48px', { lineHeight: '56px' }],
      },

      // ─── Spacing ────────────────────────────────────────────────────
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },

      // ─── Border Radius ──────────────────────────────────────────────
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },

      // ─── Box Shadow ─────────────────────────────────────────────────
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12)',
        'card-dark': '0 1px 3px rgba(0,0,0,0.4)',
        'gold-glow': '0 0 0 3px rgba(201,162,39,0.2)',
        admin: '0 2px 8px rgba(0,0,0,0.12)',
      },

      // ─── Animations ─────────────────────────────────────────────────
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out both',
        'slide-in': 'slide-in 0.25s ease-out',
        shimmer: 'shimmer 1.8s infinite linear',
      },

      // ─── Max Width ──────────────────────────────────────────────────
      maxWidth: {
        site: '1280px',
        content: '960px',
        narrow: '640px',
      },
    },
  },

  plugins: [],
}