<script setup lang="ts">
import { tv } from 'tailwind-variants'
import { textBlockClasses, proseClasses } from './styles'
import type { ITextBlock } from '~/sites/default/types/pages'

const props = defineProps<ITextBlock>()
const containerClasses = tv({
    base: 'container grid items-center gap-6',
    variants: {
        withImages: {
            true: 'lg:gap-8',
            false: '',
        },
        textWidth: {
            Small: '',
            Medium: '',
            Large: '',
            Full: '',
        },
        beforeText: {
            true: '',
            false: '',
        },
    },
    compoundVariants: [
        {
            withImages: true,
            beforeText: true,
            textWidth: 'Small',
            class: 'lg:grid-cols-[2fr,1fr]',
        },
        {
            withImages: true,
            beforeText: true,
            textWidth: 'Medium',
            class: 'lg:grid-cols-2',
        },
        {
            withImages: true,
            beforeText: true,
            textWidth: 'Large',
            class: 'lg:grid-cols-[1fr,2fr]',
        },
        {
            withImages: true,
            beforeText: false,
            textWidth: 'Small',
            class: 'lg:grid-cols-[1fr,2fr]',
        },
        {
            withImages: true,
            beforeText: false,
            textWidth: 'Medium',
            class: 'lg:grid-cols-2',
        },
        {
            withImages: true,
            beforeText: false,
            textWidth: 'Large',
            class: 'lg:grid-cols-[2fr,1fr]',
        },
    ],
})
const imagePositionClasses = tv({
    variants: {
        topGap: {
            None: '',
            Small: '',
            Medium: '',
            Large: '',
        },
        bottomGap: {
            None: '',
            Small: '',
            Medium: '',
            Large: '',
        },
        alignY: {
            Top: '',
            Center: 'self-center',
            Bottom: 'self-end',
        },
        alignX: {
            Left: '',
            Center: '',
            Right: '',
        },
        overlapY: {
            true: '',
            false: '',
        },
    },
    compoundVariants: [
        {
            topGap: 'Small',
            overlapY: true,
            class: '-mt-4 lg:-mt-8',
        },
        {
            topGap: 'Small',
            overlapY: true,
            class: '-mb-4 lg:-mb-8',
        },
        {
            topGap: 'Medium',
            overlapY: true,
            class: '-mt-8 lg:-mt-16',
        },
        {
            topGap: 'Medium',
            overlapY: true,
            class: '-mb-8 lg:-mb-16',
        },
        {
            topGap: 'Large',
            overlapY: true,
            class: '-mt-16 lg:-mt-32',
        },
        {
            topGap: 'Large',
            overlapY: true,
            class: '-mb-16 lg:-mb-32',
        },
    ],
})
</script>

<template>
    <div
        :class="containerClasses({
            withImages: props?.images && props.images?.images.length > 0,
            textWidth: props?.width,
            beforeText: props.images?.beforeText,
        })"
    >
        <div
            v-if="props?.text"
            :class="[
                textBlockClasses({
                    width: props.width,
                    centered: props.centered,
                }),
                props.images?.beforeText ? 'lg:order-2' : '', 'grid',
                props?.images && props.images?.images.length ? 'lg:max-w-none' : '',
            ].join(' ')"
        >
            <Box v-if="props.boxed">
                <div
                    :class="proseClasses({ dark: (props.baseSettings?.background === 'Dark' || props.baseSettings?.background === 'Brand') && !props.boxed })"
                    v-html="props?.text"
                >
                </div>
            </Box>
            <div
                v-else
                :class="proseClasses({ dark: (props.baseSettings?.background === 'Dark' || props.baseSettings?.background === 'Brand') && !props.boxed })"
                v-html="props?.text"
            >
            </div>
        </div>

        <div
            v-if="props?.images && props.images?.images.length"
            :class="[
                textBlockClasses({
                    width: props.width,
                    centered: props.centered,
                }),
                imagePositionClasses({
                    topGap: props?.baseSettings?.topGap || 'None',
                    bottomGap: props?.baseSettings?.bottomGap || 'None',
                    alignY: props?.images?.alignY || 'Top',
                    alignX: props?.images?.alignX || 'Center',
                    overlapY: props?.images?.overlapY || false,
                }),
                props.images?.beforeText ? 'lg:order-1' : '',
                'lg:max-w-none relative',
            ].join(' ')"
        >
            <ImageGrid
                v-if="props.images.theme === 'Simple grid'"
                :images="props.images.images"
                :grid-size="props.width"
            ></ImageGrid>
            <ImageList
                v-else-if="props.images.theme === 'List'"
                :size="props.images.size"
                :images="props.images.images"
            ></ImageList>
        </div>
    </div>
</template>
