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
        'pub-hero': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // 32px to 72px
        'pub-section': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }], // 28px to 48px
        'pub-sub': ['clamp(1.1875rem, 2.5vw, 1.75rem)', { lineHeight: '1.3' }], // 19px to 28px
        'pub-body': ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.625' }], // 16px to 18px
        'pub-nav': ['clamp(0.9375rem, 1.2vw, 1.0625rem)', { lineHeight: '1.5', fontWeight: '500' }], // 15px to 17px
        'pub-btn': ['clamp(0.9375rem, 1.2vw, 1.0625rem)', { lineHeight: '1.5', fontWeight: '600' }], // 15px to 17px
        'pub-small': ['clamp(0.875rem, 1vw, 0.9375rem)', { lineHeight: '1.5' }], // 14px to 15px
        
        // --- CMS TOKENS ---
        'cms-page': ['clamp(1.5rem, 2.5vw, 1.875rem)', { lineHeight: '1.2', fontWeight: '700' }], // 24px to 30px
        'cms-section': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', fontWeight: '600' }], // 20px to 24px
        'cms-card': ['clamp(1.125rem, 1.8vw, 1.375rem)', { lineHeight: '1.4', fontWeight: '600' }], // 18px to 22px
        'cms-body': ['clamp(1rem, 1.2vw, 1.0625rem)', { lineHeight: '1.6' }], // 16px to 17px
        'cms-label': ['clamp(0.9375rem, 1.1vw, 1rem)', { lineHeight: '1.5', fontWeight: '500' }], // 15px to 16px
        'cms-input': ['clamp(1rem, 1.2vw, 1.125rem)', { lineHeight: '1.5' }], // 16px to 18px
        'cms-btn': ['clamp(0.9375rem, 1.1vw, 1.0625rem)', { lineHeight: '1.5', fontWeight: '600' }], // 15px to 17px
        'cms-small': ['0.875rem', { lineHeight: '1.4' }], // 14px
      }
    },
  },
  plugins: [],
}
