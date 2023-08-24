<script lang="ts" setup>
const { locale } = useI18n();
const menu = await useMenu({
    url: "menus?nested&populate=deep,5",
});
</script>
<template>
    <LayoutHeader :menu="menu[locale === 'cs-CZ' ? 'cs' : locale]"></LayoutHeader>
    <slot></slot>
    <LayoutFooter></LayoutFooter>
</template>
