/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'muted-foreground': '#a0a0a0',
        'primary': '#00f0ff',
      }
    },
  },
  plugins: [],
}
