/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./views/**/*.ejs"],
   theme: {
      extend: {
         colors: {
            color1: "#FFFFFF",
            color2: "#353A47",
            color3: "#E5625E",
            color4: "#2E5266",
            color5: "#4C92BD",
         },
      },
   },
   plugins: [
      {
         tailwindcss: {},
         autoprefixer: {},
      },
   ],
};
