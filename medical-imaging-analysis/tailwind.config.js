/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textUnderlineOffset: {
        3: "3px",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ["Roboto Serif", "serif"],
      },
    },
  },
  plugins: [],
};
