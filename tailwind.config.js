/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1320px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
      '2xl': '1440px',
    },
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        body: '#e5e5e5',
        white: '#fff',
        green: { DEFAULT: '#539592', hover: '#50807d' },
        black: { DEFAULT: '#0a0706', heavy: '#050302' },
        grey: '#888888',
        orange: {
          DEFAULT: '#e08b3a',
          hover: '#c97625',
          50: '#fdf6ee',
          100: '#f9e6cd',
          200: '#f2c896',
          300: '#eaa75e',
          400: '#e08b3a',
          500: '#c97625',
          600: '#a85b1c',
          700: '#7d4116',
        },
        ember: {
          DEFAULT: '#1a0f0a',
          light: '#241612',
          deeper: '#0e0807',
        },
        ash: {
          50: '#f5f3f2',
          100: '#e9e4e1',
          200: '#cfc5be',
          300: '#a89a91',
          400: '#7d6f66',
          500: '#564a43',
          600: '#3c322d',
          700: '#2a2220',
          800: '#1c1614',
          900: '#100c0b',
        },
        outline: '#f1f1f1',
        pink: '#ffa5a5',
      },
      boxShadow: {
        primary: '0 30px 60px -20px rgba(0,0,0,0.6)',
        card: '0 10px 40px -10px rgba(0,0,0,0.5)',
        glow: '0 0 60px -10px rgba(224, 139, 58, 0.35)',
      },
      backgroundImage: {
        reservation: 'url(/reservation.jpg)',
        'noise':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        'gradient-radial':
          'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
      },
      backgroundSize: { reservation: 'cover' },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-soft both',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
