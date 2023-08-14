/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#8046FD',
        bgcolor: '#F6F6F6',
        bgDarkWidget: '#333333',
        bgNavDark: '#2E2E2E',
        bgDark: '#1E1E1E' 
      },
      fontFamily: {
        jsans: ['Josefin Sans', 'sans-serif'],
        LatoFont: ['Lato','Monsterrat', 'sans-serif'],
        nunito: ['Nunito Sans', 'sans-serif'],
        mon: ['Monsterrat', 'sans-serif']
      }
    },
  },
  plugins: [],
};
