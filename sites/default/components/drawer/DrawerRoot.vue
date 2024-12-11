<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { usePreventScroll } from '~/composables/usePreventScroll';

const props = defineProps<{
    isOpen: boolean
    onClose: () => void
}>();

const drawerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const scrollRef = ref<HTMLElement | null>(null);

const startY = ref(0);
const currentY = ref(0);
const translateY = ref(0);
const shouldAnimate = ref(true);
const lastScrollTop = ref(0);
const overlayOpacity = ref(0);
const isDragging = ref(false);
const contentHeight = ref('90dvh');

usePreventScroll(props.isOpen);

const handleScroll = (e: WheelEvent | TouchEvent) => {
    if (!scrollRef.value) {
        return;
    }

    const element = scrollRef.value;
    const isAtTop = element.scrollTop === 0;
    const isAtBottom = element.scrollHeight - element.scrollTop === element.clientHeight;

    if (e instanceof WheelEvent) {
        if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
            e.preventDefault();
        }
    } else if (e instanceof TouchEvent) {
        if (isAtTop || isAtBottom) {
            e.preventDefault();
        }
    }
};

const onPointerDown = (e: PointerEvent) => {
    if (scrollRef.value && e.target instanceof Node && scrollRef.value.contains(e.target)) {
        if (scrollRef.value.scrollTop > 0) {
            return;
        }
    }

    isDragging.value = true;
    startY.value = e.clientY;
    shouldAnimate.value = false;

    if (scrollRef.value) {
        lastScrollTop.value = scrollRef.value.scrollTop;
    }
};

const handleViewportChange = () => {
    if (!window.visualViewport || !contentRef.value) {
        return;
    }

    const currentHeight = window.visualViewport.height;
    contentHeight.value = `${currentHeight * 0.9}px`;

    const keyboardHeight = window.innerHeight - currentHeight;
    const currentTransform = keyboardHeight > 0
        ? `translateY(-${keyboardHeight}px)`
        : `translateY(${translateY.value}px)`;

    contentRef.value.style.transform = currentTransform;
    contentRef.value.style.bottom = `${window.visualViewport.offsetTop}px`;
};

onMounted(() => {
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleViewportChange);
        window.visualViewport.addEventListener('scroll', handleViewportChange);
    }

    scrollRef.value?.addEventListener('wheel', handleScroll, { passive: false });
    scrollRef.value?.addEventListener('touchmove', handleScroll, { passive: false });

    if (props.isOpen) {
        requestAnimationFrame(() => {
            overlayOpacity.value = 0.4;
        });
    }
});

onUnmounted(() => {
    if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
        window.visualViewport.removeEventListener('scroll', handleViewportChange);
    }

    scrollRef.value?.removeEventListener('wheel', handleScroll);
    scrollRef.value?.removeEventListener('touchmove', handleScroll);
});

const onPointerMove = (e: PointerEvent) => {
    if (!startY.value || !isDragging.value) {
        return;
    }

    currentY.value = e.clientY;
    const diff = currentY.value - startY.value;

    if (diff < 0) {
        translateY.value = 0;
    } else {
        translateY.value = diff;
        overlayOpacity.value = 0.4 * (1 - diff / (contentRef.value?.offsetHeight || 1));
    }
};

const onPointerUp = () => {
    if (!startY.value || !isDragging.value) {
        return;
    }

    isDragging.value = false;
    shouldAnimate.value = true;
    startY.value = 0;

    const threshold = contentRef.value ? contentRef.value.offsetHeight * 0.4 : 0;

    if (translateY.value > threshold) {
        props.onClose();
    } else {
        translateY.value = 0;
        overlayOpacity.value = 0.4;
    }
};

watch(() => props.isOpen, (newValue) => {
    if (!newValue) {
        overlayOpacity.value = 0;
    } else {
        requestAnimationFrame(() => {
            overlayOpacity.value = 0.4;
        });
    }
}, { immediate: true });
</script>

<template>
    <ClientOnly>
        <Teleport to="body">
            <div
                v-if="isOpen"
                ref="drawerRef"
                class="fixed inset-0 z-[99999]"
            >
                <div
                    class="fixed inset-0 bg-black/40 transition-opacity"
                    :class="{ 'pointer-events-none': !isOpen }"
                    :style="{ opacity: overlayOpacity }"
                    @click="onClose"
                ></div>

                <div
                    ref="contentRef"
                    class="fixed bottom-0 left-0 right-0 h-[90dvh] transform overscroll-none bg-white will-change-transform"
                    :style="{
                        transform: `translateY(${translateY}px)`,
                        transition: shouldAnimate ? 'transform 0.2s cubic-bezier(0.32, 0.72, 0, 1)' : '',
                        'touch-action': 'pan-y'
                    }"
                    @pointerdown="onPointerDown"
                    @pointermove="onPointerMove"
                    @pointerup="onPointerUp"
                    @pointerleave="onPointerUp"
                >
                    <DrawerHandle></DrawerHandle>
                    <div
                        ref="scrollRef"
                        class="h-full overflow-y-auto overscroll-contain px-4 pb-8"
                    >
                        <slot></slot>
                    </div>
                </div>
            </div>
        </Teleport>
    </ClientOnly>
</template>
