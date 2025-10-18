/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-dark': '#3D2463',
        'purple-medium': '#5B3A99',
        'purple-light': '#E8DFF5',
        'purple-lighter': '#F5F0FF',
        'gradient-start': '#4A9FE8',
        'gradient-end': '#7B6FDB',
        'blue-link': '#2B7DE9',
        'border-gray': '#E5E5E5',
        'border-purple': '#D0C0E8',
        'border-light-purple': '#E8E0F5',
        'text-black': '#000000',
        'text-dark': '#333333',
        'text-medium': '#666666',
        'text-light': '#999999',
        'bg-white': '#FFFFFF',
        'bg-off-white': '#FAFAFA',
        'bg-light-gray': '#F8F8F8',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}