import { ref, watch, onUnmounted } from 'vue';

const getScrollbarWidth = () => {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.top = '-9999px';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflow = 'scroll';
    document.body.appendChild(div);
    const scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarWidth;
};

export function usePreventScroll(isOpen: boolean) {
    const scrollPosition = ref(0);
    const scrollbarWidth = ref(0);

    const lockScroll = () => {
        scrollPosition.value = window.scrollY;
        scrollbarWidth.value = getScrollbarWidth();

        const originalStyle = window.getComputedStyle(document.body);
        const paddingRight = parseInt(originalStyle.paddingRight, 10) || 0;

        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition.value}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.paddingRight = `${paddingRight + scrollbarWidth.value}px`;
    };

    const unlockScroll = () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.paddingRight = '';
        window.scrollTo(0, scrollPosition.value);
    };

    watch(() => isOpen, (newValue) => {
        if (newValue) {
            lockScroll();
        } else {
            unlockScroll();
        }
    }, { immediate: true });

    onUnmounted(() => {
        unlockScroll();
    });
}
