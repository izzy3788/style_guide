import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let typography: (() => void) | undefined;
try {
  typography = require("@tailwindcss/typography");
} catch {
  typography = undefined;
}

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        error: "var(--color-error)",
        warning: "var(--color-warning)",
        success: "var(--color-success)",
        info: "var(--color-info)",
        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          DEFAULT: "var(--primary-500)",
        },
        secondary: {
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
          DEFAULT: "var(--secondary-500)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "\"Segoe UI\"",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [animate, typography].filter(Boolean) as Config["plugins"],
};

export default config;
