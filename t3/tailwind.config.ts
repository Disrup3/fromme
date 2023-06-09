import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "rbg(104 50 243)",
          secondary: "rgb(54, 57, 68)",
          accent: "rgb(221, 84, 113)",
          "base-100": "rgb(255, 255, 255)",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
} satisfies Config;
