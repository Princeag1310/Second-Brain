// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    './src/**/*.{html,js,ts,jsx,tsx}', // Update this if your files are in different directories
  ],
  theme: {
    extend: {
        colors: {
            gray: {
              50: "rgba(255, 255, 255, 0.5)",
              100: "#eeeeef",
              200: "#e6e9ed",
              600: "#95989c"
            },
            purple:{
                200: "#d9ddee",
                500: "#9492db", 
                600: "#7164c0"
            }
        }
    },
  },
  plugins: [],
}
