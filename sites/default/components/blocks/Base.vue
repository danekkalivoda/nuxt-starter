<script setup lang="ts">
import { type IStrapiBlockSettings, IStrapiBlockName } from '~/sites/default/types/pages'

const props = withDefaults(
    defineProps<IStrapiBlockSettings>(),
    {
        background: 'Transparent',
        bottomGap: undefined,
        topGap: undefined,
    },
)

const isHero = computed(() => {
    return props.type === IStrapiBlockName.hero
})

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
        Transparent: 'bg-transparent',
        White: 'bg-white',
        Light: 'bg-gray-100',
        Dark: 'bg-gray-400',
        Brand: 'bg-brand-500',
    },
}

const computedClasses = computed(() => {
    const getClass = (type, defaultClass) => (isHero.value ? classMappings[type][props[type] || 'None'] : defaultClass)

    const classes = [
        getClass(
            'bottomGap',
            classMappings.bottomGap.Medium,
        ),
        getClass(
            'topGap',
            classMappings.topGap.Medium,
        ),
        classMappings.background[props.background] || '',
    ]

    return classes.join(' ')
})
</script>

<template>
    <div :class="computedClasses">
        <slot></slot>
    </div>
</template>
