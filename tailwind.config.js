module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#0f172a",
      },
      screens: {
        "2xl": "1320px",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        loading: "loading 1s linear infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        loading: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      gridTemplateColumns: {
        "card-grid": "repeat(auto-fit, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [],
};
