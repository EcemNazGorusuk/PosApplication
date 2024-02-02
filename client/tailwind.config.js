/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        card: "repeat(auto-fill, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
