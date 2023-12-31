/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{jsx,js}', './index.html'], darkMode: 'media',
  theme: {
    extend: {
      backgroundColor: {
        'dark-blue': "#000316",
        'light-gray': '#ffffff20',
        'light-blue': '#2563eb',
      },
      textColor: {
        'white': '#fff',
        'light-white': '#ffffff70'
      }
    },
  },
  plugins: [],
}

