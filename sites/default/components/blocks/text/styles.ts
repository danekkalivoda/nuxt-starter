import { tv } from 'tailwind-variants';

export const textBlockClasses = tv({
    base: 'w-full',
    variants: {
        width: {
            Small: 'lg:max-w-screen-md xl:max-w-screen-sm 2xl:max-w-screen-md',
            Medium: 'lg:max-w-screen-lg xl:max-w-screen-md 2xl:max-w-screen-lg',
            Large: 'lg:max-w-screen-xl xl:max-w-screen-lg 2xl:max-w-screen-xl',
            Full: 'max-w-none',
        },
        centered: {
            true: 'mx-auto',
        },
    },
});
export const proseClasses = tv({
    base: 'w-full max-w-none',
    variants: {
        dark: {
            true: 'prose prose-white text-white/75',
            false: 'prose',
        },
    },
});
