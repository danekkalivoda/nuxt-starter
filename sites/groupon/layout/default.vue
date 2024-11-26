<script lang="ts" setup>
import type { MenulinkInterface } from '~/sites/default/components/header/DesktopMenu.vue';
import { NModalProvider } from 'naive-ui';

const { locale } = useI18n();
const menu = ref<MenulinkInterface[]>([]);

/* Tohle tady bohužel musí být, aby se menu natáhlo při změně locale */
const fetchMenuSSR = async () => {
    menu.value = await useMenu({
        url: 'menus?nested&populate=deep,5',
        locale: locale.value,
        useFetchMode: true,
    });
};
await fetchMenuSSR();
const fetchMenuFromAPI = async () => {
    const response = await $fetch(
        '/api/menu',
        {
            params: { locale: locale.value },
        },
    );
    menu.value = response;
};
watch(
    locale,
    async () => {
        await fetchMenuFromAPI();
    },
);
</script>

<template>
    <LayoutHeader :menu="menu"></LayoutHeader>
    <NuxtPage></NuxtPage>
    <LayoutFooter></LayoutFooter>
    <NModalProvider></NModalProvider>
</template>
