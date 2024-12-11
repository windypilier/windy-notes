/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FF4B8C',
          DEFAULT: '#FF1476',
          dark: '#CC0D5E',
        },
        secondary: {
          light: '#8A2BE2',
          DEFAULT: '#7B1FA2',
          dark: '#4A0072',
        },
      },
    },
  },
  plugins: [],
}
