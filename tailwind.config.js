/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Blue for buttons, progress bars
        secondary: '#F3F4F6', // Light gray for backgrounds
      },
    },
  },
  plugins: [],
};