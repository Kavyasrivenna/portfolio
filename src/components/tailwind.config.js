// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        'ping-once': 'pingOnce 0.4s ease-out',
      },
      keyframes: {
        pingOnce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.4)', opacity: 0.8 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
