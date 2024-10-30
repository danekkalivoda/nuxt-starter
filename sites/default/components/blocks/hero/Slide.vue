<script setup lang="ts">
import { tv } from 'tailwind-variants'
import { proseClasses } from '../text/styles'
import type { IHeroSlide } from '~/sites/default/types/pages'
import { NuxtLink } from '#components'

const props = defineProps<IHeroSlide>()
const isButtonLinkRelative = computed(() => {
    return props.buttonLink?.startsWith('/') ?? false
})
const textBlockWrapperClasses = tv({
    base: 'col-start-1 row-span-1 row-start-1 grid  lg:items-stretch lg:p-8',
    variants: {
        alignX: {
            Left: 'lg:justify-start',
            Center: 'lg:justify-center',
            Right: 'lg:justify-end',
        },
        textAlignY: {
            Top: 'lg:self-start',
            Center: 'lg:self-center',
            Bottom: 'lg:self-end',
        },
    },
})
const textBlockClasses = tv({
    base: 'xl:max-w-128 relative inline-flex flex-col items-start justify-center space-y-4 p-6 text-black lg:max-w-96  lg:space-y-6 lg:rounded lg:p-8 xl:p-10',
    variants: {
        background: {
            None: '',
            White: 'lg:bg-white/60 lg:shadow-lg lg:backdrop-blur',
            Black: 'lg:bg-black/60 lg:shadow-lg lg:backdrop-blur',
        },
        color: {
            White: 'lg:text-white',
            Black: 'lg:text-black',
        },
    },
})
const combinedContent = computed(() => {
    const header = props.header ? `<h2>${props.header}</h2>` : ''
    const text = props.description ? `<p>${props.description}</p>` : ''
    return `${header}${text}`
})
</script>

<template>
    <div class="relative grid-cols-1 grid-rows-1 lg:container lg:grid">
        <div class="container col-span-1 col-start-1 row-span-1 row-start-1 overflow-hidden rounded lg:px-0 lg:shadow-lg">
            <img
                :src="props.image.url"
                :alt="props.image.alt"
                loading="lazy"
                class="lg:h-128  h-96 w-full rounded object-cover align-top"
            >
        </div>
        <div
            v-if="props.header || props.description || props.buttonName"
            :class="textBlockWrapperClasses({ alignX: props.textAlignX, textAlignY: props.textAlignY })"
        >
            <div
                :class="textBlockClasses({ background: props.textBackground, color: props.textColor })"
            >
                <div
                    v-if="props.header || props.description"
                    :class="proseClasses({ dark: props.textColor === 'White' })"
                    v-html="combinedContent"
                >
                </div>
                <component
                    :is="isButtonLinkRelative ? NuxtLink : 'a'"
                    v-if="props.buttonName"
                    :to="isButtonLinkRelative ? props.buttonLink : undefined"
                    :href="isButtonLinkRelative ? undefined : props.buttonLink"
                >
                    <Button
                        theme="primary"
                        size="large"
                        tag="div"
                    >
                        {{ props.buttonName }}
                    </Button>
                </component>
            </div>
        </div>
    </div>
</template>
