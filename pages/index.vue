<script lang="ts" setup>
const { locale } = useI18n()
const { data: pageData } = await useAsyncData(() => $fetch(
    '/api/page',
    {
        params: { locale: locale.value,
            slug: '',
            homepage: true },
    },
))
const page = pageData.value
console.log(page)

useHead({
    title: page?.title,
})
</script>

<template>
    <Page
        v-if="page"
        v-bind="page"
    ></Page>
</template>
