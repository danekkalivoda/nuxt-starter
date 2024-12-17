<script lang="ts" setup>
import type { MenulinkInterface } from '~/sites/default/components/header/DesktopMenu.vue';
import { ModalsContainer } from 'vue-final-modal';
const { locale } = useI18n();

const menuKey = computed(() => `headerMenu-${locale.value}`);

const { data: menu, refresh } = await useAsyncData<MenulinkInterface[]>(menuKey.value, () => $fetch(
    '/api/menu',
    {
        params: {
            locale: locale.value,
            name: 'header',
        },
    },
));

watch(locale, () => {
    refresh();
});
</script>

<template>
    <LayoutHeader
        :menu="menu"
    ></LayoutHeader>
    <NuxtPage></NuxtPage>
    <LayoutFooter></LayoutFooter>
    <ModalsContainer></ModalsContainer>
</template>
