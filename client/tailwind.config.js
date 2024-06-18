/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {
      colors: {// Добавьте ваш пользовательский цвет
        'custom-primary': '#E8C757', 
        'custom-secondary': '#E8C757', 
        'custom-accent': '#243100', 
        'custom-background': '#456417', 
      },
    },
  },
  variants: {},
  plugins: [],
}

