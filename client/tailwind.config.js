/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#8046FD',
        bgcolor: '#F6F6F6' 
      },
      fontFamily: {
        jsans: ['Josefin Sans', 'sans-serif'],
        LatoFont: ['Lato','Monsterrat', 'sans-serif'],
        nunito: ['Nunito Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
};
