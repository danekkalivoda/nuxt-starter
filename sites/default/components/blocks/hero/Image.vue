<script setup lang="ts">
import type { IHeroBlock } from '~/sites/default/types/pages'

const props = defineProps<IHeroBlock>()
const hasContentInSlides = computed(() => {
    return props.slides.some((slide) => slide.header || slide.description || slide.buttonName)
})
</script>

<template>
    <div>
        <Splide
            v-if="props?.slides?.length > 1"
            class="relative "
            :has-track="false"
            :lazy-load="'nearby'"
            :options="{
                type: 'loop',
                autoplay: props.autoplay,
                arrows: true,
                pagination: true,
                interval: 10000,
                lazyLoad: 'nearby',
                resetProgress: false,
            }"
        >
            <div class="relative rounded">
                <SplideTrack>
                    <SplideSlide
                        v-for="slide in props.slides"
                        :key="slide.id"
                        class="w-[calc(100%)]"
                    >
                        <BlocksHeroSlide v-bind="slide"></BlocksHeroSlide>
                    </SplideSlide>
                </SplideTrack>
                <div
                    class="splide__arrows pointer-events-none absolute bottom-6 flex items-center justify-center lg:relative lg:bottom-5 lg:-mb-10"
                    :class="hasContentInSlides ? 'right-6' : 'right-12'"
                >
                    <div class="pointer-events-auto z-10 inline-flex items-center justify-center rounded-md bg-white shadow-lg ring-1 ring-black/10 lg:mt-0">
                        <button class="splide__arrow splide__arrow--prev  flex size-10 items-center justify-center rounded text-gray-300 hover:text-gray-800">
                            <Icon name="ion:chevron-back-outline"></Icon>
                        </button>
                        <div
                            class="splide__pagination [&_button:hover]:after:bg-brand-500 !hidden lg:!flex [&_button.is-active:hover]:after:bg-white [&_button.is-active]:after:scale-150 [&_button.is-active]:after:bg-white [&_button.is-active]:after:shadow [&_button.is-active]:after:ring-1 [&_button.is-active]:after:ring-black/5 [&_button]:flex [&_button]:size-6 [&_button]:items-center [&_button]:justify-center [&_button]:after:block [&_button]:after:size-2 [&_button]:after:rounded-full [&_button]:after:bg-gray-200 [&_button]:after:transition-all"
                        >
                        </div>
                        <button class="splide__arrow splide__arrow--next  flex size-10 items-center justify-center rounded text-gray-300 hover:text-gray-800">
                            <Icon name="ion:chevron-forward-outline"></Icon>
                        </button>
                    </div>
                    <!-- <div
                        v-if="props.showProgress && props.autoplay"
                        class="splide__progress absolute left-0 top-0 z-10 w-full lg:top-4"
                    >
                        <div class="splide__progress__bar bg-brand-500 h-1 lg:rounded-lg">
                        </div>
                    </div> -->
                </div>
            </div>
        </Splide>
        <BlocksHeroSlide
            v-else
            class="lg:rounded lg:shadow-lg"
            v-bind="props.slides[0]"
        ></BlocksHeroSlide>
    </div>
</template>
