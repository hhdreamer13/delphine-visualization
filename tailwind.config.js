/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],

  theme: {
    extend: {},
    fontFamily: {
      sans: ['"Open Sans"', "sans-serif"],
      serif: ['"Merriweather"', "serif"],
      titre: ['"Sue Ellen Francisco"', "sans-serif"],
      body: ['"Delius"', "sans-serif"],
      sousTitre: ['"Caveat"', "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
