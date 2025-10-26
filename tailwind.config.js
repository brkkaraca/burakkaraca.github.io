/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        text: '#1A2C3A',
        border: '#D6E2E8',
        hover: '#2C5F6C',
      }
    },
  },
  plugins: [],
}
