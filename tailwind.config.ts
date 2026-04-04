import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F8F0E4",
        parchment: "#FFF9F1",
        sage: {
          DEFAULT: "#1F7A75",
          soft: "#E6F2EF",
          hover: "#176763",
        },
        warm: {
          DEFAULT: "#C86017",
          hover: "#AA5012",
          light: "#F1DED0",
        },
        earth: "#283452",
        "deep-nest": "#1F2333",
        blush: "#F4E5E1",
        mist: "#7E7A78",
        success: "#7BAF6B",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "-apple-system", "sans-serif"],
        caveat: ["var(--font-caveat)", "cursive"],
      },
      boxShadow: {
        card: "0 18px 45px rgba(110, 84, 54, 0.12)",
        "card-hover": "0 28px 60px rgba(110, 84, 54, 0.18)",
        navbar: "0 14px 40px rgba(53, 39, 28, 0.12)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "bounce-gentle": "bounce-gentle 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
