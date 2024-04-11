/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-once': 'pulse-once 3s ease-in-out',
      },
      keyframes: {
        "pulse-once": {
          '0%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0 },
        }
      }
    },
  },
  plugins: [require("daisyui")],
};
