<script setup lang="ts">
import {
    type IHeaderBlock,
} from '~/sites/default/types/pages';
import { proseClasses } from '~/sites/default/components/blocks/text/styles';
import { useIntersectionObserver, useResizeObserver } from '@vueuse/core';
const props = withDefaults(defineProps<IHeaderBlock>(), {
    stickySubHeader: false,
});
const containerRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const { setState: setHeaderState } = useHeader();
const ready = ref(false);
const headerSubnavRef = ref<HTMLElement | null>(null);

const updateCssVariable = (value) => {
    const root = document.documentElement;
    root.style.setProperty('--subheader-height', `${value}px`);
    setHeaderState({ height: value });
};
useResizeObserver(headerSubnavRef, (entries) => {
    const entry = entries[0];
    const height = entry.contentRect.height;
    nextTick(() => {
        updateCssVariable(height);
    });
});

let stopIntersectionObserver: () => void;

onMounted(async () => {
    await nextTick();

    if (containerRef.value) {
        const { stop } = useIntersectionObserver(
            containerRef,
            ([entry]) => {
                isVisible.value = entry.isIntersecting;
                if (!ready.value) {
                    ready.value = true;
                }
                if (entry.isIntersecting && headerSubnavRef.value) {
                    updateCssVariable(headerSubnavRef.value.offsetHeight);
                }
            },
        );

        stopIntersectionObserver = stop;
    }
});

onUnmounted(() => {
    if (stopIntersectionObserver) {
        stopIntersectionObserver();
    }
});

</script>
<template>
    <div
        v-show="ready && props.stickySubHeader"
        class="fixed top-[var(--header-height)] z-[70] grid w-full bg-white/90 shadow-lg backdrop-blur-md transition-all duration-150"
        :class="[
            isVisible ? 'grid-rows-[0fr]':'grid-rows-[1fr]',
        ].join(' ')"
    >
        <div

            class="w-full overflow-hidden"
        >
            <div
                ref="headerSubnavRef"
                class="container"
            >
                <div
                    class="border-t border-black/5 py-2 text-sm"
                >
                    <span class="font-semibold">{{ props.text }}</span>
                </div>
            </div>
        </div>
    </div>
    <div
        ref="containerRef"
        class="container"
    >
        <div :class="proseClasses({ dark: (props.baseSettings?.background === 'Dark' || props.baseSettings?.background === 'Brand')})">
            <h1 :class="props.centered ? 'text-center' : ''">
                {{ props.text }}
            </h1>
            <div
                v-if="props.filterItems?.length > 0"
                class=" flex w-full  flex-wrap items-center gap-x-12 gap-y-1 leading-5"
                :class="props.centered ? 'justify-center mx-auto max-w-3xl' : ''"
            >
                <FilterItems
                    :items="props.filterItems"
                    :dark="(props.baseSettings?.background === 'Dark' || props.baseSettings?.background === 'Brand')"
                ></FilterItems>
            </div>
            <div
                v-if="props.buttons?.length > 0"
                class=" mt-8 flex w-full flex-wrap items-center gap-4"
                :class="props.centered ? 'justify-center mx-auto max-w-3xl' : ''"
            >
                <ButtonsList :buttons="props.buttons"></ButtonsList>
            </div>
        </div>
    </div>
</template>
