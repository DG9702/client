import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['var(--font-Roboto)'],
        Josefin: ['var(--font-Josefin)']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      screens: {
        '1000px': '1000px',
        '1100px': '1100px',
        '1200px': '1200px',
        '1300px': '1300px',
        '1400px': '1400px',
        '1500px': '1500px',
        '900px': '900px',
        '800px': '800px',
        '600px': '600px',
        '400px': '400px',
        '300px': '300px'
      }
    }
  },
  plugins: []
};
export default config;
