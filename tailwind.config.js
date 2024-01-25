/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{js,css}",
    "./views/**/*.ejs"
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
  daisyui: {
    themes: ["night", "winter"],
    darkTheme: "night"
  },
};
