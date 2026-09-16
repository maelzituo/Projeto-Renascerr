/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'renascer-dark': '#06241B',
        'renascer-green-dark': '#0B3D2E',
        'renascer-green': '#16A05D',
        'renascer-light': '#F5F5F5',
        'renascer-gray': '#9A9A9A',
      },
      fontFamily: {
        'display': ['Outfit', 'sans-serif'],
        'body': ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}

