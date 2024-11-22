/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors.js'
import typography from '@tailwindcss/typography'
import { sharedConfig } from './shared.tailwind.config.js'

export const config = {
    content: [
        ...sharedConfig.content,
        './components/**/*.{js,vue,ts}',
        './sites/default/**/*.{js,vue,ts}',
        'col-span-full',
        'col-span-1',
        'col-span-2',
    ],
    theme: {
        ...sharedConfig.theme,
        screens: sharedConfig.theme.screens,
        extend: {
            ...sharedConfig.theme.extend,
            colors: {
                gray: colors.gray,
                brand: {
                    50: '#e2f7f9',
                    100: '#cef1f5',
                    200: '#a8e7ed',
                    300: '#82dce6',
                    400: '#5cd2de',
                    500: '#36c7d6',
                    600: '#24a3b0',
                    700: '#1a7881',
                    800: '#114d53',
                    900: '#072224',
                    950: '#060818',
                },
            },
            fontFamily: {
                sans: [
                    '"Inter"',
                    'sans-serif',
                ],
                brand: [
                    '"Inter"',
                    'sans-serif',
                ],
                display: [
                    '"Inter"',
                    'sans-serif',
                ],
            },
            typography: (theme) => ({
                ...sharedConfig.theme.extend.typography,
                DEFAULT: {
                    css: {
                        '--tw-prose-body': theme('colors.gray[700]'),
                        '--tw-prose-headings': theme('colors.gray[800]'),
                        'color': theme('colors.gray[800]'),
                        'fontSize': 'clamp(0.8rem,1vw,1rem)',
                        'h2': {
                            fontWeight: '600',
                        },
                    },
                },
            }),
        },
    },
    variants: sharedConfig.variants,
    safelist: sharedConfig.safelist,
    plugins: sharedConfig.plugins,
}
export default config
