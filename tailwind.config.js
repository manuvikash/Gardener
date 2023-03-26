/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      extend: {
        backgroundImage: {
          plant: "url('../src/assets/bg.jpg')",
        },
      },
    },
  },
  plugins: [],
};
