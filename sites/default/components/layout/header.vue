<script lang="ts" setup>
import type { MenulinkInterface } from '~/sites/default/components/header/DesktopMenu.vue'

const { locales } = useI18n()
interface HeaderInterface {
    menu: MenulinkInterface[]
}
const props = withDefaults(
    defineProps<HeaderInterface>(),
    {},
)
const mobileMenuOpen = ref(false)
</script>

<template>
    <div>
        <AuthenticationStatus></AuthenticationStatus>
        <nav
            class="container mx-auto flex items-center justify-between py-6"
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
