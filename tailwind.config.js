/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2e2e2e",
        secondary: "#3a3a3a",
        accent: "#4f46e5",
        light: "#f8fafc",
        dark: "#1e1e1e",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        loading: 'loading 3s linear infinite',
      },
      keyframes: {
        loading: {
          '0%': { backgroundPosition: '-800px 0' },
          '50%': { backgroundPosition: '0px 0' },
          '100%': { backgroundPosition: '800px 0' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar": {
          /* Ẩn thanh cuộn nhưng vẫn giữ chức năng cuộn */
          "scrollbar-width": "none", /* Firefox */
          "-ms-overflow-style": "none", /* IE/Edge */
        },
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none", /* Chrome, Safari, Edge */
        },
      });
    },
  ],
};
