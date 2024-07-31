<script lang="ts" setup>
export interface PageInterface {
    title: string;
    description: string;
}
const { locale } = useI18n();
const route = useRoute();
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug || "index";

const { data: pageData } = await useAsyncData(() =>
    $fetch("/api/page", {
        params: { locale: locale.value, slug, homepage: false },
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
    <template v-else>
        <div>template 404 - neexistuje</div>
    </template>
</template>
