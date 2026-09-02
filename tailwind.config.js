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
        rajwada: ['"Playfair Display"', 'serif'],
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        marathi: ['"Noto Serif Devanagari"', 'serif']
      },
      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 0.8vw + 0.6rem, 1rem)',
        'fluid-base': 'clamp(1rem, 1vw + 0.75rem, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1.5vw + 0.75rem, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 2vw + 0.8rem, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 2.5vw + 1rem, 2rem)',
        'fluid-3xl': 'clamp(1.75rem, 3.5vw + 1rem, 2.5rem)',
        'fluid-4xl': 'clamp(2rem, 5vw + 1rem, 3.5rem)',
        'fluid-5xl': 'clamp(2.5rem, 6vw + 1rem, 4.5rem)',
      }
    },
  },
  plugins: [],
}
