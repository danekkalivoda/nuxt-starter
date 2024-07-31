<script lang="ts" setup>
import type { PageInterface } from "~/pages/[slug].vue";
const { locale } = useI18n();
const { data: pageData } = await useAsyncData(() =>
    $fetch("/api/page", {
        params: { locale: locale.value, slug: "", homepage: true },
    })
);

const page = pageData.value;
useHead({
    title: page?.title,
});
</script>
<template>
    <template v-if="page">
        <h1>{{ page.title }}</h1>
        <p>{{ page.description }}</p>
    </template>
</template>
