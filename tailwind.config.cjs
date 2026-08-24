/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      colors: {
        ink: "#0b0b0c",
        hull: {
          green: "#10b981",
          "green-text": "#067a55",
          "green-soft": "#e9fbf3",
        },
      },
      maxWidth: {
        landing: "1180px",
      },
      keyframes: {
        "hb-dash": {
          to: { strokeDashoffset: "-24" },
        },
        "hb-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-7px)" },
        },
        "hb-sheen": {
          "0%, 55%": { transform: "translateX(-35%) rotate(8deg)" },
          "75%, 100%": { transform: "translateX(125%) rotate(8deg)" },
        },
      },
      animation: {
        "hb-dash": "hb-dash 2s linear infinite",
        "hb-float": "hb-float 5s ease-in-out infinite",
        "hb-sheen": "hb-sheen 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}