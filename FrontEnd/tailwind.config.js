/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark': '#1A1423',
        'text': '#1A1A2F',
        'main': '#24244F',
        'second': '#FFC409',
        'main-shadow': '#24244F5e',
        'second-shadow': '#FFC4095e',
      },
    },
    screens: {
      'full': {'max': '1919px'},
      '2xl': {'max': '1600px'},
      'xl': {'max': '1280px'},
      'lg': {'max': '1000px'},
      'md': {'max': '850px'},
      'sm': {'max': '600px'},
    }
  },
  plugins: [],
}

