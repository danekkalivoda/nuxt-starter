<script lang="ts" setup>
const { locales } = useI18n();
import type { MenulinkInterface } from '~/sites/default/components/header/DesktopMenu.vue';
interface HeaderInterface {
    menu: MenulinkInterface[];
}
const props = withDefaults(defineProps<HeaderInterface>(), {});
const mobileMenuOpen = ref(false);
</script>
<template>
    <div>
        <nav
            class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
            aria-label="Global"
        >
            <div class="flex lg:flex-1">
                <HeaderLogo></HeaderLogo>
            </div>
            <HeaderMenuToggler @on-menu-toggle="(value) => (mobileMenuOpen = value)"></HeaderMenuToggler>
            <HeaderDesktopMenu :menu="props.menu"></HeaderDesktopMenu>
            <div
                v-if="locales.length !== 1"
                class="hidden lg:flex lg:flex-1 lg:justify-end"
            >
                <HeaderLanguageSwitch></HeaderLanguageSwitch>
            </div>
        </nav>
        <HeaderMobileMenu
            :is-open="mobileMenuOpen"
            :menu="props.menu"
            @on-menu-toggle="(value) => (mobileMenuOpen = value)"
        ></HeaderMobileMenu>
    </div>
</template>
