/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors.js';
import typography from '@tailwindcss/typography';
import { sharedConfig } from './shared.tailwind.config.js';

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
                        'fontSize': 'clamp(0.875rem,1vw,1rem)',
                        'h2': {
                            fontWeight: '700',
                        },
                    },
                },
                white: {
                    css: {
                        '--tw-prose-body': theme('colors.white'),
                        '--tw-prose-headings': theme('colors.white'),
                        '--tw-prose-lead': theme('colors.white'),
                        '--tw-prose-links': theme('colors.white'),
                        '--tw-prose-bold': theme('colors.white'),
                        '--tw-prose-counters': theme('colors.white'),
                        '--tw-prose-bullets': theme('colors.white'),
                        '--tw-prose-hr': theme('colors.white'),
                        '--tw-prose-quotes': theme('colors.white'),
                        '--tw-prose-quote-borders': theme('colors.white'),
                        '--tw-prose-captions': theme('colors.white'),
                        '--tw-prose-code': theme('colors.white'),
                        '--tw-prose-pre-code': theme('colors.white'),
                        '--tw-prose-pre-bg': theme('colors.white'),
                        '--tw-prose-th-borders': theme('colors.white'),
                        '--tw-prose-td-borders': theme('colors.white'),
                    },
                },
            }),
        },
    },
    variants: sharedConfig.variants,
    safelist: sharedConfig.safelist,
    plugins: sharedConfig.plugins,
};
export default config;
