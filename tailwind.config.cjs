/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter",
        serif: "Roboto",
        mono: "Source Code Pro"
      },
      colors: {
        gray: {
          '50': '#f3f8fa',
          '100': '#d8e8ef',
          '200': '#b0cfdf',
          '300': '#80aec8',
          '400': '#568aab',
          '500': '#3c6d90',
          '600': '#2e5573',
          '700': '#28455d',
          '800': '#24394b',
          '900': '#22323f',
          '950': '#0b131c',
        },
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
};
