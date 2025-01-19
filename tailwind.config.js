/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ntrl-clr-100':'#E5E7EB',
        'ntrl-clr-200':'#6C727F',
        'ntrl-clr-300':'#121826',
      }
    },
  },
  plugins: [],
}