/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wine: {
          50: '#fdf7f6',
          100: '#f9eaea',
          200: '#f1d2d3',
          300: '#e3aab0',
          400: '#cf7e88',
          500: '#b45a68',
          600: '#96404f',
          700: '#7a2e3e',
          800: '#611f30',
          900: '#4b1625',
          950: '#2e0c16',
        },
        cream: {
          50: '#fffdf8',
          100: '#fbf4e6',
          200: '#f6e8d2',
          300: '#eed8b7',
          400: '#e2c293',
          500: '#d3a86c',
          600: '#b88a4b',
          700: '#976b35',
          800: '#76502b',
          900: '#553a24',
        },
      },
      fontFamily: {
        sans: ['Tajawal', 'Segoe UI', 'Tahoma', 'sans-serif'],
        serif: ['Amiri', 'Georgia', 'serif'],
      },
      boxShadow: {
        glass:
          '0 30px 70px -35px rgba(75, 22, 37, 0.32), 0 10px 30px -20px rgba(151, 107, 53, 0.16)',
        'glass-soft':
          '0 18px 45px -30px rgba(75, 22, 37, 0.28), 0 6px 18px -14px rgba(151, 107, 53, 0.12)',
        glow: '0 20px 45px -18px rgba(122, 46, 62, 0.5)',
        'glow-cream': '0 18px 40px -20px rgba(184, 138, 75, 0.35)',
      },
    },
  },
  plugins: [],
};
