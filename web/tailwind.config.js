import { theme } from 'tailwindcss/defaultConfig';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...theme.fontFamily.sans],
      },
      colors: {
        'blue-base': '#2C46B1',
        'blue-dark': '#2C4091',
        white: '#FFFFFF',
        'gray-100': '#F9F9FB',
        'gray-200': '#E4E6EC',
        'gray-300': '#CDCFD5',
        'gray-400': '#74798B',
        'gray-500': '#4D505C',
        'gray-600': '#1F2025',
        danger: '#B12C4D',
      },
      fontSize: {
        xl: ['28px', { lineHeight: '32px', fontWeight: '700' }],
        lg: ['18px', { lineHeight: '24px', fontWeight: '700' }],
        md: ['14px', { lineHeight: '18px', fontWeight: '600' }],
        sm: ['12px', { lineHeight: '14px' }],
        xs: ['10px', { lineHeight: '12px' }],
      }
    },
    plugins: [],
  }
}
