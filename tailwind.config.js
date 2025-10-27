module.exports = {
  theme: {
    extend: {
      keyframes: {
        fadeScale: {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        fadeScale: 'fadeScale 1s ease-out forwards',
      },
    },
  },
}
