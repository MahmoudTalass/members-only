/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./views/**/*.ejs"],
   theme: {
      extend: {
         colors: {
            color1: "#FFFFFF",
            color2: "#999799",
            color3: "E5625E",
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
