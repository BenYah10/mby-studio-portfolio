import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0D12",
        paper: "#F5F7FA",
        muted: "#9AA3B2",
        line: "#222733",
        accent: "#7C9CFF"
      },
      boxShadow: {
        glow: "0 0 80px rgba(124, 156, 255, 0.18)"
      }
    },
  },
  plugins: [],
};

export default config;
