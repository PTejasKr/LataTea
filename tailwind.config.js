/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          accent: '#F89E22',
          'accent-hover': '#E08A15',
          'accent-pale': '#FFF8ED',
          primary: '#1A1A1A',
          'primary-dark': '#000000',
          surface: '#FFFFFF',
          background: '#FFFFFF',
          text: '#1A1A1A',
          'text-muted': '#666666',
          border: '#E5E5E5',
        }
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-scale': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'slow-scale': 'slow-scale 20s ease-out forwards',
      },
      fontFamily: {
        rajwada: ['"Playfair Display"', '"Noto Serif Devanagari"', 'serif'],
        serif: ['"Playfair Display"', '"Noto Serif Devanagari"', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Noto Serif Devanagari"', 'sans-serif'],
        marathi: ['"Noto Serif Devanagari"', 'serif']
      },
      fontSize: {
        // --- PUBLIC WEBSITE TOKENS ---
        'pub-hero': ['clamp(1.875rem, 4.2vw, 3.5rem)', { lineHeight: '1.18', letterSpacing: '-0.02em' }],
        'pub-section': ['clamp(1.375rem, 3vw, 2.375rem)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        'pub-sub': ['clamp(1.0625rem, 2vw, 1.4375rem)', { lineHeight: '1.35' }],
        'pub-body': ['clamp(0.9375rem, 1.1vw, 1.0625rem)', { lineHeight: '1.65' }],
        'pub-nav': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.04em', fontWeight: '600' }],
        'pub-btn': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '700' }],
        'pub-small': ['0.8125rem', { lineHeight: '1.5' }],
        
        // --- CMS TOKENS ---
        'cms-page': ['clamp(1.375rem, 2.2vw, 1.75rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'cms-section': ['clamp(1.1875rem, 1.8vw, 1.375rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'cms-card': ['clamp(1.0625rem, 1.5vw, 1.25rem)', { lineHeight: '1.4', fontWeight: '600' }],
        'cms-body': ['clamp(0.9375rem, 1.1vw, 1rem)', { lineHeight: '1.6' }],
        'cms-label': ['0.8125rem', { lineHeight: '1.5', fontWeight: '600' }],
        'cms-input': ['0.875rem', { lineHeight: '1.5' }],
        'cms-btn': ['0.8125rem', { lineHeight: '1.5', fontWeight: '600' }],
        'cms-small': ['0.75rem', { lineHeight: '1.4' }],
      }
    },
  },
  plugins: [],
}
