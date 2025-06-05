// tailwind.config.js
export const content = ["./src/**/*.{js,jsx}"];
export const theme = {
  extend: {
    animation: {
      slide: "slide 20s linear infinite",
    },
    keyframes: {
      slide: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-50%)" },
      },
    },
  },
};
export const plugins = [];