import {heroui} from "@heroui/theme"
const { fontFamily } = require('tailwindcss/defaultTheme');


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'custom-blue-dark': '#02165E',
        'custom-blue-light': '#006EE7',
      },
      fontFamily: {
        poppins: ['Poppins', ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}
