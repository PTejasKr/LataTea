/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Simplified Brand Design Tokens: Light Green + White + Clean Neutrals
        brand: {
          primary: '#2E7D32',        // Clean brand green
          'primary-light': '#4CAF50',  // Light Green accent / hover
          'primary-pale': '#EBF5EC',   // Soft light green tint
          'primary-dark': '#1B4332',   // Deep forest green for text & dark headers
          surface: '#FFFFFF',          // Clean white surface
          background: '#F8FAF8',       // Subtle off-white clean background
          text: '#1A291B',             // Crisp dark text
          'text-muted': '#5A6B5C',     // Muted readable text
          border: '#E2ECE3',           // Soft neutral border
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
