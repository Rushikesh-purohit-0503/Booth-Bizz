/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        colors: {
          'custom-pink': 'rgba(248, 155, 148, 0.588)', // Using RGBA for better compatibility
        },
      }
    },
  },
  plugins: [],
}

