/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',    // Beautiful orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',    // Beautiful blue accent
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',    // Green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',    // Amber
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',    // Red
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        background: '#ffffff',
        surface: '#f8fafc',
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
          muted: '#94a3b8',
          inverse: '#ffffff',
        },
        border: {
          light: '#e2e8f0',
          medium: '#cbd5e1',
          dark: '#94a3b8',
        },
        // Orange theme colors
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',    // Main orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Professional hosting colors
        hosting: {
          primary: '#f97316',    // Orange
          secondary: '#3b82f6',  // Blue
          accent: '#22c55e',     // Green
          dark: '#0f172a',       // Dark theme
          light: '#f8fafc',      // Light theme
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // Enhanced shadows for cards
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'card-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'card-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'card-orange': '0 10px 25px -5px rgba(249, 115, 22, 0.3), 0 4px 10px -2px rgba(249, 115, 22, 0.2)',
        'card-blue': '0 10px 25px -5px rgba(59, 130, 246, 0.3), 0 4px 10px -2px rgba(59, 130, 246, 0.2)',
        'card-green': '0 10px 25px -5px rgba(34, 197, 94, 0.3), 0 4px 10px -2px rgba(34, 197, 94, 0.2)',
        'card-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.1)',
        'card-glow': '0 0 20px rgba(249, 115, 22, 0.15), 0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        'card-soft': '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
        'card-medium': '0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)',
        'card-strong': '0 8px 20px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-2': 'float 6s ease-in-out infinite 2s',
        'float-3': 'float 6s ease-in-out infinite 4s',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'gradient-x': 'gradient-x 15s ease infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'shadow-pulse': 'shadowPulse 3s ease-in-out infinite',
        'shadow-bounce': 'shadowBounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(249, 115, 22, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.8)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        shadowPulse: {
          '0%, 100%': { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)' },
          '50%': { boxShadow: '0 8px 20px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(0, 0, 0, 0.12)' },
        },
        shadowBounce: {
          '0%, 100%': { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)' },
          '50%': { boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2), 0 6px 18px rgba(0, 0, 0, 0.15)' },
        },
      },
    },
  },
  plugins: [
    // @tailwindcss/line-clamp is now included by default in Tailwind CSS v3.3+
  ],
}
