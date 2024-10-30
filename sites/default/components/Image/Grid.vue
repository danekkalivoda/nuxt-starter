<script setup lang="ts">
import { tv } from 'tailwind-variants'
import type { IImage } from '~/sites/default/types/pages'

const props = withDefaults(
    defineProps<{
        images: IImage[]
        gridSize?: 'Small' | 'Medium' | 'Large' | 'Full'
    }>(),
    {},
)

const gridClasses = tv({
    base: 'grid grid-cols-1 gap-6',
    variants: {
        size: {
            Small: 'grid-cols-[repeat(auto-fit,minmax(180px,1fr))]',
            Medium: 'grid-cols-[repeat(auto-fit,minmax(120px,1fr))]',
            Large: '@lg/imageGrid:grid-cols-4 grid-cols-2 ',
            Full: 'grid-cols-[repeat(auto-fit,minmax(120px,1fr))]',
        },
    },
})
</script>

<template>
    <div class="@container/imageGrid">
        <div
            :class="gridClasses({ size: props.gridSize })"
        >
            <div
                v-for="image in props.images"
                :key="image.id"
            >
                <img
                    :src="image?.formats?.medium?.url || image?.url"
                    :width="image?.formats?.medium?.width"
                    :height="image?.formats?.medium?.height"
                    class="aspect-square rounded object-cover"
                >
            </div>
        </div>
    </div>
</template>
