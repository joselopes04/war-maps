/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
      },
      screens: {
        'xs': '340px', //FOLD :)
      },
    },
  },
  plugins: [],
}