// tailwind.config.js
export default {
  darkMode: "media", // 시스템 다크모드 따름
  theme: {
    extend: {
      colors: {
        // 필요 시 커스텀 색상 추가 가능
        primary: "#646cff",
        primaryHover: "#535bf2",
      },
      fontFamily: {
        sans: ["system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
};
