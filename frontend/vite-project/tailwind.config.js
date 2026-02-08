/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                emerald: {
                    primary: '#10b981',
                    dark: '#059669',
                    light: '#6ee7b7',
                    subtle: '#a7f3d0',
                },
                gold: {
                    primary: '#fbbf24',
                    light: '#fde047',
                    accent: '#f59e0b',
                },
                cream: {
                    white: '#fffbeb',
                    soft: '#fefce8',
                },
                'text-dark': '#1f2937',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                inter: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
            },
            boxShadow: {
                'sm-custom': '0 2px 8px rgba(16, 185, 129, 0.1)',
                'md-custom': '0 4px 16px rgba(251, 191, 36, 0.2)',
                'lg-custom': '0 8px 32px rgba(251, 191, 36, 0.25)',
                'gold': '0 0 25px rgba(251, 191, 36, 0.6)',
            },
            animation: {
                'fade-in-up': 'fadeInUp 1s ease-out',
                'fade-in': 'fadeIn 0.3s ease',
                'shimmer': 'shimmer 4s infinite linear',
                'rotate': 'rotate 3s linear infinite',
                'spin-slow': 'spin 1s linear infinite',
                'pulse-scale': 'pulseScale 2s ease-in-out infinite',
                'slide-down': 'slideDown 0.3s ease',
                'slide-up': 'slideUp 0.3s ease',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                rotate: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                pulseScale: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(50px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
