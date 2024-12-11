<script lang="ts" setup>
import type { MenulinkInterface } from '~/sites/default/components/header/DesktopMenu.vue';
import { NDrawer, NDrawerContent } from 'naive-ui';
import { useMediaQuery, useScroll, useResizeObserver } from '@vueuse/core';
const { setState: setHeaderState } = useHeader();
const { status } = useAuth();


interface HeaderInterface {
    menu: MenulinkInterface[];
}
const props = withDefaults(defineProps<HeaderInterface>(), {});
const mobileMenuOpen = ref(false);
const isMobile = useMediaQuery('(max-width: 1023px)');

const toggleMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
    setHeaderState({ isMenuOpen: mobileMenuOpen.value });
};
const headerRef = ref<HTMLElement | null>(null);
const { y } = useScroll(window, { throttle: 200 });
const isTopSticky = computed(() => y.value > 0);
watchEffect(() => {
    setHeaderState({ isSticky: isTopSticky.value, yOffset: y.value });
});
const updateCssVariable = (value) => {
    const root = document.documentElement;
    root.style.setProperty('--header-height', `${value}px`);
    setHeaderState({ height: value });
};
useResizeObserver(headerRef, (entries) => {
    const entry = entries[0];
    const height = entry.contentRect.height;
    updateCssVariable(height);
});
</script>

<template>
    <div
        ref="headerRef"
        class="sticky top-0 z-[60] transition-shadow"
        :class="isTopSticky ? 'ring-1 ring-black/5 shadow-lg shadow-black/5' : ''"
    >
        <div class="relative bg-white/90 backdrop-blur-md">
            <PortalUserMenu
                v-if="status === 'authenticated'"
                class="relative z-50"
                @close="mobileMenuOpen = false"
            ></PortalUserMenu>
            <nav
                class="container relative z-50 mx-auto flex flex-wrap items-center justify-between py-3 lg:py-1"
                aria-label="Global"
            >
                <div class="flex lg:flex-1">
                    <HeaderLogo></HeaderLogo>
                </div>
                <HeaderMenuToggler
                    :is-open="mobileMenuOpen"
                    @on-menu-toggle="toggleMenu"
                ></HeaderMenuToggler>

                <ClientOnly>
                    <NDrawer
                        v-if="isMobile"
                        :show="mobileMenuOpen"
                        placement="top"
                        width="auto"
                        :show-mask="false"
                    >
                        <NDrawerContent
                            :native-scrollbar="false"
                            :scrollbar-props="{
                                trigger: 'hover'
                            }"
                        >
                            <div
                                class="fixed inset-0 z-0 transition-all lg:hidden"
                                @click="toggleMenu"
                            >
                            </div>
                            <div
                                class="max-w-128 relative z-10 m-4 mx-auto flex w-[calc(100%-32px)] flex-col items-stretch self-start rounded-md bg-white shadow-lg ring-1 ring-black/5"
                                @click.stop
                            >
                                <HeaderMenu
                                    :menu="props.menu"
                                    :is-open="mobileMenuOpen"
                                    :is-mobile="isMobile"
                                    @close="mobileMenuOpen = false"
                                ></HeaderMenu>
                            </div>
                        </NDrawerContent>
                    </NDrawer>
                </ClientOnly>
                <HeaderMenu
                    :menu="props.menu"
                    :is-mobile="isMobile"
                    :is-open="mobileMenuOpen"
                    class="hidden items-center lg:flex lg:gap-4"
                    @close="mobileMenuOpen = false"
                ></HeaderMenu>
            </nav>
        </div>
        <div
            id="header-subnav"
            class="relative z-50"
        ></div>
    </div>
</template>
