/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#2563EB',
          secondary: '#3B82F6',
          bg: '#F8FAFC',
          text: '#1E3A8A',
        },
        dark: {
          primary: '#8B5CF6',
          secondary: '#A78BFA',
          bg: '#0F172A',
          text: '#EDE9FE',
        }
      }
    },
  },
  plugins: [],
}

