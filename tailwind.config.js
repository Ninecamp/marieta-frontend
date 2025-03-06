/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserratsans': ['Montserrat', 'sans-serif'],
        'montserrat': ['Montserrat'],
        'reem-kufi': ['"Reem Kufi"', 'sans-serif'],
      },
      fontSize: {
        '13': '13px',
        '15': '15px',
      },
      lineHeight: {
        '16': '16px',
        '25': '25px',
      },
      fontWeight: {
        medium: 500,
        large: 600,
      },
      colors: {
        'custom-gray': 'rgb(213, 213, 213)',
        'custom-green': 'rgb(50, 76, 34)',
      },
    },
  },
  plugins: [],
}