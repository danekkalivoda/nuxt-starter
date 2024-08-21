export const MultiselectStyles = {
    root: ({ props, state }) => ({
        class: [
            'inline-flex',
            'min-h-10',
            'relative',
            'rounded',
            'bg-white',
            'border',
            'focus:outline-none',
            { 'border-gray-200': !props.invalid },
            { 'border-red-500': props.invalid },
            'transition-colors',
            'duration-300',
            { 'focus-within:border-gray-300': !props.invalid },
            { 'outline-none ring ring-gray-400/10': state.focused },
            'cursor-pointer',
            'select-none',
            { 'opacity-60': props.disabled, 'pointer-events-none': props.disabled, 'cursor-default': props.disabled },
        ],
    }),
    labelContainer: 'overflow-hidden flex flex-auto cursor-pointer',
    label: ({ props }: { props: any }) => {
        let _a, _b, _c, _d;
        return {
            class: [
                'inline-flex items-center flex-wrap',
                // Spacing
                {
                    'px-3 leading-[38px]': props.display !== 'chip',
                    'py-0 px-3 leading-[38px]': props.display === 'chip' && !((_a = props == null ? void 0 : props.modelValue) != null && _a.length),
                    'py-1 px-1 leading-4 min-h-[38px] gap-1': props.display === 'chip' && ((_b = props == null ? void 0 : props.modelValue) == null ? void 0 : _b.length) > 0,
                },
                // Color
                { 'text-gray-800': (_c = props.modelValue) == null ? void 0 : _c.length, 'text-gray-400': !((_d = props.modelValue) != null && _d.length) },
                'placeholder:text-gray-400',
                // Transitions
                'transition duration-150',
                // Misc
                'overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis',
            ],
        };
    },
    dropdown: {
        class: ['flex items-center justify-center', 'shrink-0', 'bg-transparent', 'text-gray-500', 'w-10', 'rounded-tr-md', 'rounded-br-md'],
    },
    overlay: {
        class: ['border', 'rounded', 'shadow-md', 'bg-white', 'text-gray-800'],
    },
    header: {
        class: ['flex items-center justify-between', 'py-3 px-5 gap-2', 'm-0', 'border-b', 'rounded-tl-md', 'rounded-tr-md', 'text-gray-600', 'bg-gray-50', '[&_[data-pc-name=pcfiltercontainer]]:!flex-auto', '[&_[data-pc-name=pcfilter]]:w-full'],
    },
    listContainer: {
        class: ['max-h-[200px]', 'overflow-auto'],
    },
    list: {
        class: 'py-2 list-none m-0',
    },
    option: ({ context }) => ({
        class: [
            // Font
            'font-normal',
            'leading-none',
            // Flexbox
            'flex items-center',
            // Position
            'relative',
            // Shape
            'border-0',
            'rounded-none',
            // Spacing
            'm-0',
            'py-3 px-5 gap-2',
            '[&>div[data-pc-name]]:relative', '[&>div[data-pc-name]]:size-4', '[&>div[data-pc-name]>input]:opacity-0', '[&>div[data-pc-name]>input]:absolute',
            // Color
            { 'text-gray-700': !context.focused && !context.selected },
            { 'bg-gray-50 text-gray-700': context.focused && !context.selected },
            { 'bg-brand-50/50': context.selected },
            //States
            { 'hover:bg-gray-50': !context.focused && !context.selected },
            { 'hover:text-gray-700 hover:bg-gray-50': context.focused && !context.selected },
            // Transitions
            'transition-shadow',
            'duration-150',
            // Misc
            'cursor-pointer',
            'overflow-hidden',
            'whitespace-nowrap',
            'group/option',
        ],
    }),
    pcChip: {
        class: ['inline-flex'],
    },
    optionGroup: {
        class: ['font-bold', 'm-0', 'p-3 px-5', 'text-surface-800 dark:text-white/80', 'bg-surface-0 dark:bg-surface-600/80', 'cursor-auto'],
    },
    emptyMessage: {
        class: ['leading-none', 'py-3 px-5', 'text-gray-400', 'bg-transparent'],
    },
    loadingIcon: {
        class: 'text-gray-400 animate-spin',
    },
    transition: {
        enterFromClass: 'opacity-0 translate-y-4',
        enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass: 'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0',
    },
};
