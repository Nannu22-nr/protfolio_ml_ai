import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070c",
        navy: {
          900: "#080d18",
          800: "#0b1222",
          700: "#111a30",
        },
        line: "rgba(148, 163, 184, 0.16)",
        signal: {
          DEFAULT: "#2dd4bf",
          dim: "#14b8a6",
          soft: "rgba(45, 212, 191, 0.12)",
        },
        cyanline: "#22d3ee",
        paper: "#e4ebee",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "serif"],
      },
      letterSpacing: {
        label: "0.18em",
      },
      keyframes: {
        trace: {
          "0%": { strokeDashoffset: "1200" },
          "100%": { strokeDashoffset: "0" },
        },
        scan: {
          "0%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(110%)" },
        },
      },
      animation: {
        trace: "trace 3.2s ease-out forwards",
        scan: "scan 7s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
