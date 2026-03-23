/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#E9D5FF',
          DEFAULT: '#A855F7',
          dark: '#7E22CE',
        },
        neutral: '#F9FAFB',
      },
    },
  },
  plugins: [],
}