/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': '#FFFFFF',
        'sidebar-bg': '#F7F7F5',
        'app-border': '#EBEBEA',
        'app-text': '#37352F',
        'app-text-secondary': 'rgba(55, 53, 47, 0.65)',
        'app-accent': '#F5A623',
      }
    }
  },
  plugins: [],
};
