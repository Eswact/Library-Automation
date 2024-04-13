/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark': '#1A1423',
        'text': '#1A1A2F',
        'main': '#2894B5',
        'second': '#EEC681',
        'main-shadow': '#2894B55e',
        'second-shadow': '#EEC6815e',
        'green': '#4FB477',
        'green-shadow': '#4FB4775e',
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

