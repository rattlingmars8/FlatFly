/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7065F0",
        purpleShades: "#E0DEF7",
        background: "#F8F9FA",
        text: "#000929",
        borderGray: "#E0E5EC",
        secondary: "#554ccf",
      },
      fontFamily: {
        quicksand: ["Quicksand", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
