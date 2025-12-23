/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-primary': '#2e1065',
                'bg-secondary': '#4c1d95',
                'bg-card': '#5b21b6',
                'accent-cyan': '#22d3ee',
                'accent-pink': '#f472b6',
                'accent-yellow': '#facc15',
            },
            fontFamily: {
                main: ['"Varela Round"', 'sans-serif'],
            },
            keyframes: {
                pop: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                },
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-5px)' },
                    '75%': { transform: 'translateX(5px)' },
                }
            },
            animation: {
                pop: 'pop 0.3s ease-out',
                shake: 'shake 0.4s ease-in-out',
            }
        },
    },
    plugins: [],
}
