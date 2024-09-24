import { tv } from 'tailwind-variants'

export const textBlockClasses = tv({
    base: 'w-full',
    variants: {
        width: {
            Small: 'max-w-screen-sm',
            Medium: 'max-w-screen-md',
            Large: 'max-w-screen-lg',
            Full: 'max-w-none',
        },
        centered: {
            true: 'mx-auto',
        },
    },
})
export const proseClasses = tv({
    base: ' w-full max-w-none',
    variants: {
        dark: {
            true: 'prose prose-white text-white/60',
            false: 'prose',
        },
    },
})
