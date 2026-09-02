/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sole UI accent color: #F89E22 + Clean White + Dark Neutral Text
        brand: {
          accent: '#F89E22',           // Core UI accent color (#F89E22)
          'accent-hover': '#E08A15',   // Hover state
          'accent-pale': '#FFF8ED',    // Soft pale tint for backgrounds
          primary: '#1A1A1A',          // Dark neutral for main text
          'primary-dark': '#000000',   // Black
          surface: '#FFFFFF',          // Clean white surface
          background: '#FFFFFF',       // Clean white background
          text: '#1A1A1A',             // Crisp dark text
          'text-muted': '#666666',     // Muted readable text
          border: '#E5E5E5',           // Soft neutral border
        },
        // Kept for backward compatibility
        latagreen: {
          50: '#f2f8f2',
          100: '#e1efe1',
          200: '#c4e0c4',
          300: '#99cb99',
          400: '#67af68',
          500: '#3e8f40',
          600: '#2b732d',
          700: '#235c25',
          800: '#1e3f20',
          900: '#163018',
          950: '#0c1a0d'
        },
        lataleaf: {
          400: '#a3cb58',
          500: '#8db843',
          600: '#779f34'
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
        rajwada: ['"Rozha One"', '"Cinzel"', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        marathi: ['"Noto Serif Devanagari"', '"Rozha One"', '"Mukta"', 'serif']
      }
    },
  },
  plugins: [],
}
