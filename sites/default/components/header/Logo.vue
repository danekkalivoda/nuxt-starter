<script setup lang="ts">
const localePath = useLocalePath();

import Logo from "~/recruitis-shared/components/logo.vue";
const props = withDefaults(defineProps<{ theme?: "dark" | "light" }>(), {
    theme: "light",
});
</script>
<template>
    <NuxtLink :to="localePath('/')" class="h-8 w-24 lg:h-12 lg:w-32">
        <Logo :theme="props.theme" class="flex h-full w-full items-center" svg-class="w-full h-full" />
    </NuxtLink>
</template>
