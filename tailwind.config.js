/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',  
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
    keyframes: {
    fadeInUp: {
      '0%': { opacity: 0, transform: 'translateY(20px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
  },
    animation: {
      fadeInUp: 'fadeInUp 0.4s ease-out forwards',
      'bounce-fast': 'bounce 0.8s infinite',
  },
  } },
  plugins: [],
};