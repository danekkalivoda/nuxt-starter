<script lang="ts" setup>
import { PageInterface } from "~/pages/[slug].vue";
const { locale } = useI18n();
definePageMeta({ auth: false });
const page: PageInterface | undefined = await usePages({
    url: "pages?populate=deep",
    locale: locale.value,
    slug: "",
    homepage: true,
});
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
