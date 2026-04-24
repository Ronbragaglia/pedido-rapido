/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#FF6B35',
        'brand-red': '#E63946',
        'brand-yellow': '#FFB703',
      },
    },
  },
  plugins: [],
}
