/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vedic: {
          50: '#fffaf5',
          100: '#feeddb',
          200: '#fcd3b3',
          300: '#f9b183',
          400: '#f4854f',
          500: '#ea580c',
          600: '#c2410c',
          700: '#a3330c',
          800: '#89270b',
          900: '#681f08',
          brand: '#b44d12',
          gold: '#d97706',
          dark: '#26170d'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Merriweather', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
