/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 3px)' },
          '40%': { transform: 'translate(-3px, -3px)' },
          '60%': { transform: 'translate(3px, 3px)' },
          '80%': { transform: 'translate(3px, -3px)' },
          'to': { transform: 'translate(0)' },
        },
        shift: {
          '0%, 40%, 44%, 58%, 61%, 65%, 69%, 73%, 100%': { transform: 'skewX(0deg)' },
          '41%': { transform: 'skewX(10deg)' },
          '42%': { transform: 'skewX(-10deg)' },
          '59%': { transform: 'skewX(40deg) skewY(10deg)' },
          '60%': { transform: 'skewX(-40deg) skewY(-10deg)' },
          '63%': { transform: 'skewX(10deg) skewY(-5deg)' },
          '70%': { transform: 'skewX(-50deg) skewY(-20deg)' },
          '71%': { transform: 'skewX(10deg) skewY(-10deg)' },
        },
      },
      animation: {
        glitch: 'glitch 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite',
        reverseGlitch: 'glitch 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite',
        shift: 'shift 1s ease-in-out infinite alternate',
      },
      colors: {
        'glitch-purple': '#8b00ff',
        'glitch-green': '#00e571',
      },
      zIndex: {
        '-1': '-1',
        '-2': '-2',
      },
    },
  },  plugins: [],
};
