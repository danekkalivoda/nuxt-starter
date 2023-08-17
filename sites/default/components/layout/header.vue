<script lang="ts" setup>
const { locales } = useI18n();

const menu = await useMenu("menus/1?nested&populate=deep,5");
const mobileMenuOpen = ref(false);
</script>
<template>
    <div>
        <AuthenticationStatus />
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div class="flex lg:flex-1">
                <HeaderLogo />
            </div>
            <HeaderMenuToggler @on-menu-toggle="(value) => (mobileMenuOpen = value)" />
            <HeaderDesktopMenu :menu="menu" />
            <div v-if="locales.length !== 1" class="hidden lg:flex lg:flex-1 lg:justify-end">
                <HeaderLanguageSwitch />
            </div>
        </nav>
        <HeaderMobileMenu
            :is-open="mobileMenuOpen"
            :menu="menu"
            @on-menu-toggle="(value) => (mobileMenuOpen = value)"
        />
    </div>
</template>
