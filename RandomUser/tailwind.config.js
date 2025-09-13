/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Harry: ["Harrypotter", "wizzard", 'serif'],
        wizard: ['Cinzel Decorative', 'serif'],
        parchment: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}