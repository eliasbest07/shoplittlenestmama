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
        cream: "#FFF8F0",
        sage: {
          DEFAULT: "#A8B5A0",
          soft: "#E8EDE5",
          hover: "#8FA087",
        },
        warm: {
          DEFAULT: "#D4A574",
          hover: "#C09460",
          light: "#F0E6D8",
        },
        earth: "#5D4E37",
        "deep-nest": "#3D3228",
        blush: "#FFE4E6",
        success: "#7BAF6B",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "-apple-system", "sans-serif"],
        caveat: ["var(--font-caveat)", "cursive"],
      },
      boxShadow: {
        card: "0 4px 20px rgba(93, 78, 55, 0.08)",
        "card-hover": "0 8px 30px rgba(93, 78, 55, 0.15)",
        navbar: "0 2px 10px rgba(61, 50, 40, 0.1)",
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
