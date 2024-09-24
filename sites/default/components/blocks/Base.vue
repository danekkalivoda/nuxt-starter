<script setup lang="ts">
import type { IStrapiBlockSettings } from '~/sites/default/types/pages'

const props = withDefaults(
    defineProps<IStrapiBlockSettings>(),
    {
        background: 'Transparent',
        bottomGap: 'None',
        topGap: 'None',
    },
)

const classMappings: Record<string, Record<string, string>> = {
    bottomGap: {
        None: 'pb-0',
        Small: 'pb-4 lg:pb-8',
        Medium: 'pb-8 lg:pb-16',
        Large: 'pb-16 lg:pb-32',
    },
    topGap: {
        None: 'pt-0',
        Small: 'pt-4 lg:pt-8',
        Medium: 'pt-8 lg:pt-16',
        Large: 'pt-16 lg:pt-32',
    },
    background: {
        Transparent: 'before:bg-transparent',
        White: 'before:bg-white',
        Light: 'before:bg-gray-100',
        Dark: 'before:bg-gray-900',
        Brand: 'before:bg-brand-500',
    },
    backgroundPosition: {
        TopLeft: 'before:bg-top-left',
        TopCenter: 'before:bg-top',
        TopRight: 'before:bg-top-right',
        CenterLeft: 'before:bg-center-left',
        Center: 'before:bg-center',
        CenterRight: 'before:bg-center-right',
        BottomLeft: 'before:bg-bottom-left',
        BottomCenter: 'before:bg-bottom',
        BottomRight: 'before:bg-bottom-right',
    },
    backgroundRepeat: {
        NoRepeat: 'before:bg-no-repeat',
        Repeat: 'before:bg-repeat',
        RepeatX: 'before:bg-repeat-x',
        RepeatY: 'before:bg-repeat-y',
    },
    backgroundSize: {
        Cover: 'before:bg-cover',
        Contain: 'before:bg-contain',
        Auto: '',
    },
    additional: {
        background: 'relative before:absolute before:z-[-1] before:inset-0 before:w-full before:h-full',
        backgroundImage: 'before:[background-image:var(--bg-image)]',
    },
}

const computedClasses = computed(() => {
    const classes = [
        classMappings.topGap[props.topGap] || '',
        classMappings.bottomGap[props.bottomGap] || '',
        classMappings.background[props.background] || '',
        props.backgroundImage?.url ? classMappings.backgroundPosition[props.backgroundPosition || 'Center'] : '',
        props.backgroundImage?.url ? classMappings.backgroundRepeat[props.backgroundRepeat || 'NoRepeat'] : '',
        props.backgroundImage?.url ? classMappings.backgroundSize[props.backgroundSize || 'Auto'] : '',
        (props.backgroundImage?.url || props.background) ? classMappings.additional.background : '',
        props.backgroundImage?.url ? classMappings.additional.backgroundImage : '',
    ]

    return classes.join(' ')
})

const backgroundImageStyle = computed(() => {
    return props.backgroundImage?.url ? props.backgroundImage.url : ''
})
</script>

<template>
    <div
        :style="props.backgroundImage?.url ? `--bg-image: url('${backgroundImageStyle}')` : ''"
        :class="computedClasses"
    >
        <slot></slot>
    </div>
</template>
