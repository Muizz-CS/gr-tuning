/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- Tells Tailwind to style everything inside src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}