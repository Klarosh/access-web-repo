/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'glow-border': 'glowBorder 2s infinite alternate',
        'sweep': 'sweepEffect 3s linear infinite',
      },
      keyframes: {
        glowBorder: {
          '0%': { boxShadow: '0 0 5px #00a2ff44' },
          '100%': { boxShadow: '0 0 15px #00a2ffcc' },
        },
        sweepEffect: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
        cyber: ['"Orbitron"', 'sans-serif'],
      },
      colors: {
        blue: {
          50: "#DFDFF0",
          75: "#dfdff2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#4FB7DD",
        },
        violet: {
          300: "#5724ff",
        },
        yellow: {
          100: "#8e983f",
          200: "#FF2E2E",
          300: "#edff66",
        },
      },
    },
  },
  plugins: [],
  }
