/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        marine: {
          DEFAULT: "#14123A",
          light: "#211E54",
          dark: "#0B0A22"
        },
        azur: {
          DEFAULT: "#1E96FC",
          light: "#5DB4FD",
          dark: "#0C6FCB"
        },
        turquoise: {
          DEFAULT: "#4FD1C5",
          light: "#9FE8DF",
          dark: "#2EA89B"
        },
        vert: {
          DEFAULT: "#0F766E",
          light: "#14B8A6",
          dark: "#0B544E"
        },
        ardoise: {
          DEFAULT: "#334155",
          light: "#64748B",
          dark: "#1E293B"
        },
        fondclair: "#F8FAFC"
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      boxShadow: {
        card: "0 4px 24px -8px rgba(20, 18, 58, 0.12)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
};
