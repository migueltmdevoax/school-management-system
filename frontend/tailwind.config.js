/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      primary: "#0f172a",     // fondo
      secondary: "#1e293b",   // cards
      accent: "#22c55e",      // verde fintech
      danger: "#ef4444",
      text: "#e2e8f0"
    }
  }
}
}