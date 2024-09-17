<script setup lang="ts">
import type { IHeroBlock } from '~/sites/default/types/pages'

const props = defineProps<IHeroBlock>()
</script>

<template>
    <div class="lg:container">
        <Splide
            v-if="props?.slides?.length > 1"
            class="relative overflow-hidden ring-1 ring-inset ring-black/10 lg:rounded lg:ring-0"
            :has-track="false"
            :lazy-load="'nearby'"
            :options="{
                type: 'loop',
                autoplay: props.autoplay,
                arrows: true,
                pagination: false,
                interval: 10000,
                lazyLoad: 'nearby',
                resetProgress: false,
            }"
        >
            <div
                v-if="props.showProgress && props.autoplay"
                class="splide__progress absolute bottom-0 left-0 z-10 w-full"
            >
                <div class="splide__progress__bar bg-brand-500 h-1 lg:rounded-lg">
                </div>
            </div>
            <div class="splide__arrows pointer-events-none absolute bottom-4 right-4 z-20">
                <div class="pointer-events-auto flex gap-4">
                    <button class="splide__arrow splide__arrow--prev flex size-8 items-center justify-center rounded-full bg-white/50 backdrop-blur">
                        <Icon name="ion:chevron-back-outline"></Icon>
                    </button>
                    <button class="splide__arrow splide__arrow--next flex size-8 items-center justify-center rounded-full bg-white/50 backdrop-blur">
                        <Icon name="ion:chevron-forward-outline"></Icon>
                    </button>
                </div>
            </div>
            <SplideTrack>
                <SplideSlide
                    v-for="slide in props.slides"
                    :key="slide.id"
                    class="w-[calc(100%)]"
                >
                    <BlocksHeroSlide
                        v-bind="slide"
                    ></BlocksHeroSlide>
                </SplideSlide>
            </SplideTrack>
        </Splide>
        <BlocksHeroSlide
            v-else
            v-bind="props.slides[0]"
        ></BlocksHeroSlide>
    </div>
</template>
