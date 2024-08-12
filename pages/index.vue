<script lang="ts" setup>
import Page from '~/sites/default/pages/page.vue';
const { locale } = useI18n();
const { data: pageData } = await useAsyncData(() =>
    $fetch('/api/page', {
        params: { locale: locale.value, slug: '', homepage: true },
    }),
);

const page = pageData.value;
useHead({
    title: page?.title,
});
</script>
<template>
  <Page
    v-if="page"
    v-bind="page"
  />
</template>
