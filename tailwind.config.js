/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        harrypotter: ["Harry Potter", "sans-serif"],
        gloria:["Gloria Hallelujah", "cursive"]
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
