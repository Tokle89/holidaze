/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
      },
    },
    colors: {
      blue: "#1d1d5a",
      orange: "#ffac4d",
      "light-blue": "#0f63ac",
    },
  },
  plugins: [],
};
