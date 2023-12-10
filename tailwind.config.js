/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        'home-image' : "url('https://img.freepik.com/free-photo/empty-cinema-auditorium-with-chairs_651396-2891.jpg?size=626&ext=jpg&ga=GA1.1.29457701.1673842719&semt=sph')"
      }
    }
  },
  plugins: [],
}

