/** @type {import('tailwindcss').Config} */
const { theme } = require("./styles/theme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // @dev - here we import our custom theming from `styles/theme.js`
    ...theme,
  },
  plugins: [],
};
