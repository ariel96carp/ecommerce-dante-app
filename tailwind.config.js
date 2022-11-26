/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './js/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': "'League Spartan', sans-serif"
      },
      colors: {
        'ca-sky-light': '#f0f9ff'
      },
      screens: {
        'xs': '480px'
      },
      keyframes: {
        marquet: {
          '100%': { transform: 'translate(-100%, 0)' }
        },
        translateY: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        alertTranslate: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(100%)' 
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)' 
          }
        }
      },
      animation: {
        'marquet-slow': 'marquet 10s linear infinite',
        'translate-slow': 'translateY .5s linear 1',
        'alert-translate': 'alertTranslate .25s linear 1'
      }
    },
  },
  plugins: [],
}
