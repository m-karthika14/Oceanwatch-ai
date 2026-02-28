/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          command: '#071A2D',
          panel: '#0F2A3F',
          teal: '#1FA6A0',
          warning: '#F2C94C',
          danger: '#EB5757',
          text: '#E6F0F5',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'command-gradient': 'linear-gradient(135deg, #071A2D 0%, #0F2A3F 100%)',
        'scan-line': 'repeating-linear-gradient(0deg, rgba(31, 166, 160, 0.03) 0px, rgba(31, 166, 160, 0.03) 1px, transparent 1px, transparent 2px)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(31, 166, 160, 0.5)',
        'glow-red': '0 0 20px rgba(235, 87, 87, 0.5)',
        'glow-yellow': '0 0 20px rgba(242, 201, 76, 0.5)',
      },
      keyframes: {
        'scan-pulse': {
          '0%': { boxShadow: '0 0 20px rgba(31, 166, 160, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(31, 166, 160, 0.8)' },
          '100%': { boxShadow: '0 0 20px rgba(31, 166, 160, 0.5)' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'slide-up': {
          'from': { transform: 'translateY(100%)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'scan-pulse': 'scan-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 0.3s infinite',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
