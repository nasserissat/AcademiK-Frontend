/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0E43AD',
        secondary: '#fff',
        tertiary: '#465766',
        // system colors
        success: '#66D18D',
        danger: '#EC6969',
        warning: '#F4B74F',
        info: '#BAE2FE',
      }
    },
  },
  plugins: [],
}

