/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "emerald",
      "luxury",
      {
        forest: {
          ...require("daisyui/src/colors/themes")["[data-theme=forest]"],
          "color-scheme": "dark",
          neutral: "#192432",
          "base-100": "#222b3a",
          "--rounded-btn": "0.5rem",
        },
      },
    ],
  },
};
