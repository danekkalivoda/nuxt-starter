<script lang="ts" setup>
export interface PageInterface {
    title: string;
    description: string;
}

const { locale } = useI18n();
const route = useRoute();
const router = useRouter();

const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug || "index";
const page: PageInterface | undefined = await usePages({
    url: "pages?populate=deep",
    locale: locale.value,
    slug,
});

useHead({
    title: page?.title,
});
</script>
<template>
    {{ page }}
    <template v-if="page">
        <h1>{{ page.title }}</h1>
        <p>{{ page.description }}</p>
    </template>
    <template v-else>
        <div>template 404 - neexistuje</div>
    </template>
</template>
