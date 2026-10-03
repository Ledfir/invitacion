/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#C5CA99',
          100: '#ADCA99',
          200: '#99CA9E',
          300: '#7AB087',
          400: '#5A9670',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
