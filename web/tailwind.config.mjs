/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#DEDEDE",
        main: "#1F1F1F",
        foreground: "#323232",
        primary: "#EF6622",
        primary2: "#FFB082",
        secondary: "#1F4397",
        secondary2: "#6D86AD",
      },
      spacing: {
        layout: "1.0rem", // Cố định khoảng cách giữa các div
      },
      fontFamily: {
        sans: ["Nunito", "sans-serif"], // Đổi font mặc định
      },
      fontSize: {
        ssm: "13px",
        base: "16px",
        lg: "18px",
        xl: "20px",
      },
    },
  },
  plugins: [],
};
