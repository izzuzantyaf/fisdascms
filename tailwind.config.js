const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './database/seeders/*.php',
    './app/Models/*.php',
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
        rose: colors.rose,
        cyan: colors.cyan,
        sky: colors.sky,
      },
      transitionDelay: {
        '5000': '5000ms',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
