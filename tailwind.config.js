/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        expo: "var(--expo)",
        canada: "var(--canada)",
        "canada-sign": "var(--canada-sign)",
        yellow: "var(--yellow)",
        grey: "var(--grey)",
        rule: "var(--rule)",
        hair: "var(--hair)",
      },
      fontFamily: {
        sans: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
}
