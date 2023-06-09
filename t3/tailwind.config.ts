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
          primary: "#6832F3",
          secondary: "#363944",
          "base-100": "#FFFFFF",
          accent: "#DD5471",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
} satisfies Config;
