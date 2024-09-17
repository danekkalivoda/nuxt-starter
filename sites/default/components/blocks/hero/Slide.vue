<script setup lang="ts">
import type { IHeroSlide } from '~/sites/default/types/pages'
import { NuxtLink } from '#components'

const props = defineProps<IHeroSlide>()
const isButtonLinkRelative = computed(() => {
    return props.buttonLink?.startsWith('/') ?? false
})
</script>

<template>
    <div class="relative grid-cols-1 grid-rows-1 overflow-hidden lg:grid lg:rounded">
        <img
            :src="props.image.url"
            :alt="props.image.alt"
            loading="lazy"
            class="h-128 col-span-1 col-start-1 row-span-1 row-start-1 w-full object-cover  align-top"
        >
        <div class="col-start-1 row-span-1 row-start-1 grid self-end lg:items-stretch lg:p-8">
            <div
                class="xl:max-w-128 relative inline-flex flex-col items-start justify-center space-y-4 p-4 text-black lg:max-w-96  lg:space-y-6 lg:rounded lg:p-8 xl:p-10"
                :class="[
                    props.textBackground === 'None' ? '' : (props.textBackground === 'Black' ? 'lg:bg-black/50' : 'lg:bg-white/50'),
                    props.textColor === 'Black' ? 'lg:text-black' : 'lg:text-white',
                    props.textBackground !== 'None' ? 'lg:shadow-lg lg:backdrop-blur' : '',
                ].join(' ')"
            >
                <div class="space-y-4 lg:space-y-6">
                    <h2 class="text-xl font-bold lg:text-3xl xl:text-4xl">
                        {{ props.header }}
                    </h2>
                    <p class="text-sm text-opacity-75 lg:text-base">
                        {{ props.description }}
                    </p>
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
                        @click="() => { console.log('click') }"
                    >
                        {{ props.buttonName }}
                    </Button>
                </component>
            </div>
        </div>
    </div>
</template>
