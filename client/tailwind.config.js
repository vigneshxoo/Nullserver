import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pop: ["Poppins", "sans-serif"],
        fontb:[ "Lato","serif"],
        fontc:[ "Lato"," serif"]
         },
    },
  },
  plugins: [
    daisyui
  ],
}

// 
