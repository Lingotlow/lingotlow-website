/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#1a1a1a',
        'brand-yellow': '#F5A623',
        'brand-yellow-dark': '#D4891C',
        'brand-yellow-light': '#FFF3E0',
        'brand-gray': '#6B6B6B',
        'brand-light-gray': '#F7F7F7',
        'brand-border': '#E0E0E0',
      },
    },
  },
  plugins: [],
}
