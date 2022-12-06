/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      spacing: {
        112: '28rem',
        128: '32rem',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
