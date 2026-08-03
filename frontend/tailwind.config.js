/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--base)",
        panel: "var(--panel)",
        panel2: "var(--panel2)",
        line: "var(--line)",
        text: "var(--text)",
        muted: "var(--muted)",
        signal: "var(--signal)",
        alert: "var(--alert)",
        watch: "var(--watch)",
        wire: "var(--wire)",
      },
    },
  },
  plugins: [],
};