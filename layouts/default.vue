<script lang="ts" setup>
const { locale } = useI18n();

const menu = ref();
menu.value = await useMenu({
    url: "menus?nested&populate=deep,5",
    locale: locale.value === "cs-CZ" ? "cs" : locale.value,
});

watch(
    () => locale.value,
    async (value) => {
        if (value) {
            menu.value = await useMenu({
                url: "menus?nested&populate=deep,5",
                locale: value === "cs-CZ" ? "cs" : value,
            });
        }
    }
);
</script>
<template>
    <LayoutHeader :menu="menu"></LayoutHeader>
    <slot></slot>
    <LayoutFooter></LayoutFooter>
</template>
