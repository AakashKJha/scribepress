/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        paper: '#FAF6EF',
        ink: '#1A1614',
        muted: '#6B5D52',
        rule: '#D9CFC2',
        accent: '#A8321E', // printer's red
      },
    },
  },
  plugins: [],
};
