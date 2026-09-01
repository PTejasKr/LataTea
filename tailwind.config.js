/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        latagreen: {
          50: '#f2f8f2',
          100: '#e1efe1',
          200: '#c4e0c4',
          300: '#99cb99',
          400: '#67af68',
          500: '#3e8f40',
          600: '#2b732d',
          700: '#235c25',
          800: '#1e3f20', // primary brand dark green
          900: '#163018',
          950: '#0c1a0d'
        },
        lataamber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#e58a1f', // warm brochure gold/marigold
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        },
        lataleaf: {
          400: '#a3cb58',
          500: '#8db843', // fresh light tea leaf green
          600: '#779f34'
        },
        latacream: {
          50: '#ffffff',
          100: '#fdfbf7',
          200: '#faf6ee', // primary warm cream
          300: '#f3ebd9',
          400: '#e9dcbe'
        }
      },
      fontFamily: {
        rajwada: ['"Rozha One"', '"Cinzel Decorative"', 'serif'],
        royal: ['"Cinzel"', '"Playfair Display"', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        hindi: ['"Yatra One"', '"Rozha One"', 'serif']
      }
    },
  },
  plugins: [],
}
