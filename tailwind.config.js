/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01"
        },
        black: {
          DEFAULT: "#000",
          50: "#999",
          100: "#1E1E2D",
          200: "#232533"
        },
        gray: {
          100: "#CDCDE0"
        },
        red: {
          50: '#ffe5e5',
          100: '#fbbaba',
          200: '#f28f8f',
          300: '#e86464',
          400: '#df3939',
          500: '#d50e0e',
          600: '#b30b0b',
          700: '#900808',
          800: '#6d0606',
          900: '#4a0303',
        },
        'warm-red': '#FF5733',
        'coral': '#FF6F61',
        'primary-red': '#D32F2F',
        'light-red': '#FFCDD2',
        'dark-red': '#C62828',
        'accent White': '#FFFFFF',
        'accent-dark-gray': '#424242'
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}

