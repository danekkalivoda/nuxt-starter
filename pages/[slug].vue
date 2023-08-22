<script lang="ts" setup>
export interface PageInterface {
    title: string;
    description: string;
}
definePageMeta({ auth: false });
const { locale } = useI18n();
const nuxtApp = useNuxtApp();
const route = useRoute();
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug || "index";
const page: PageInterface | undefined = await usePages({
    url: "pages?populate=deep",
    locale: locale.value === "cs-CZ" ? "cs" : locale.value,
    slug,
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
    <template v-else>
        <div>template 404 - neexistuje</div>
    </template>
</template>
