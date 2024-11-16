import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'londrina-solid': ['var(--font-londrina-solid)'],
            },
            colors: {
                'custom-green': {
                    '50': '#f0fafb',
                    '100': '#d8f1f5',
                    '200': '#b5e2ec',
                    '300': '#82cdde',
                    '400': '#53b3cb', // this color
                    '500': '#2d92ad',
                    '600': '#287692',
                    '700': '#266078',
                    '800': '#275163',
                    '900': '#244455',
                    '950': '#132b39',
                },
                'custom-yellow': {
                    '50': '#fffbeb',
                    '100': '#fdf3c8',
                    '200': '#fce68b',
                    '300': '#fad34f',
                    '400': '#f9c22e', // this color
                    '500': '#f39f0d',
                    '600': '#d77908',
                    '700': '#b2540b',
                    '800': '#91410f',
                    '900': '#773610',
                    '950': '#441b04',
                },
                'custom-orange': {
                    '50': '#fef3f2',
                    '100': '#fee5e2',
                    '200': '#ffcfc9',
                    '300': '#fdaea4',
                    '400': '#f97f70', // this color
                    '500': '#f15946',
                    '600': '#de3924',
                    '700': '#bb2c1a',
                    '800': '#9a281a',
                    '900': '#80271c',
                    '950': '#461009',
                },
                'custom-red': {
                    '50': '#fff1f3',
                    '100': '#ffe4e7',
                    '200': '#ffccd5',
                    '300': '#fea3b2',
                    '400': '#fd6f8b',
                    '500': '#f63d65',
                    '600': '#e01a4f', // this color
                    '700': '#c01043',
                    '800': '#a1103f',
                    '900': '#8a113c',
                    '950': '#4d041d',
                },
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
                'color-1': 'hsl(var(--color-1))',
                'color-2': 'hsl(var(--color-2))',
                'color-3': 'hsl(var(--color-3))',
                'color-4': 'hsl(var(--color-4))',
                'color-5': 'hsl(var(--color-5))',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            animation: {
                gradient: 'gradient 8s linear infinite',
                'shimmer-slide':
                    'shimmer-slide var(--speed) ease-in-out infinite alternate',
                'spin-around':
                    'spin-around calc(var(--speed) * 2) infinite linear',
                rainbow: 'rainbow var(--speed, 2s) infinite linear',
                marquee: 'marquee var(--duration) infinite linear',
                'marquee-vertical':
                    'marquee-vertical var(--duration) linear infinite',
            },
            keyframes: {
                gradient: {
                    to: {
                        backgroundPosition: 'var(--bg-size) 0',
                    },
                },
                'shimmer-slide': {
                    to: {
                        transform: 'translate(calc(100cqw - 100%), 0)',
                    },
                },
                'spin-around': {
                    '0%': {
                        transform: 'translateZ(0) rotate(0)',
                    },
                    '15%, 35%': {
                        transform: 'translateZ(0) rotate(90deg)',
                    },
                    '65%, 85%': {
                        transform: 'translateZ(0) rotate(270deg)',
                    },
                    '100%': {
                        transform: 'translateZ(0) rotate(360deg)',
                    },
                },
                rainbow: {
                    '0%': {
                        'background-position': '0%',
                    },
                    '100%': {
                        'background-position': '200%',
                    },
                },
                marquee: {
                    from: {
                        transform: 'translateX(0)',
                    },
                    to: {
                        transform: 'translateX(calc(-100% - var(--gap)))',
                    },
                },
                'marquee-vertical': {
                    from: {
                        transform: 'translateY(0)',
                    },
                    to: {
                        transform: 'translateY(calc(-100% - var(--gap)))',
                    },
                },
            },
        },
    },
    plugins: [animate],
} satisfies Config
