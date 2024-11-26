<script lang="ts" setup>
import type { MenulinkInterface } from '~/sites/default/components/header/DesktopMenu.vue';
import { NDrawer } from 'naive-ui';
import { useMediaQuery } from '@vueuse/core';
const { status } = useAuth();

interface HeaderInterface {
    menu: MenulinkInterface[]
}
const props = withDefaults(
    defineProps<HeaderInterface>(),
    {},
);
const mobileMenuOpen = ref(false);
const isMobile = useMediaQuery('(max-width: 1023px)');
</script>

<template>
    <div>
        <PortalUserMenu v-if="status === 'authenticated'"></PortalUserMenu>
        <nav
            class="container mx-auto flex flex-wrap items-center justify-between py-6"
            aria-label="Global"
        >
            <div class="flex lg:flex-1">
                <HeaderLogo></HeaderLogo>
            </div>
            <HeaderMenuToggler
                :is-open="mobileMenuOpen"
                @on-menu-toggle="(value) => (mobileMenuOpen = value)"
            ></HeaderMenuToggler>

            <ClientOnly>
                <NDrawer
                    v-if="isMobile"
                    :show="mobileMenuOpen"
                    placement="right"
                    width="auto"
                    :show-mask="false"
                    class="!w-[calc(100vw-4rem)] max-w-96 !rounded-l-lg bg-white shadow-lg ring-1 ring-black/5 lg:!w-auto lg:shadow-none"
                    @mask-click="() => mobileMenuOpen = !mobileMenuOpen"
                >
                    <HeaderMenu
                        :menu="props.menu"
                        :is-mobile="isMobile"
                        class="p-4"
                        @close="mobileMenuOpen = false"
                    ></HeaderMenu>
                </NDrawer>
            </ClientOnly>
            <HeaderMenu
                :menu="props.menu"
                :is-mobile="isMobile"
                class="hidden lg:flex lg:gap-4"
                @close="mobileMenuOpen = false"
            ></HeaderMenu>
        </nav>
    </div>
</template>
