<script lang="ts" setup>
import Page from '~/sites/default/pages/page.vue';
const { locale } = useI18n();
const route = useRoute();
const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug || 'index';

const { data: pageData } = await useAsyncData(() =>
    $fetch('/api/page', {
        params: { locale: locale.value, slug, homepage: false },
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
  <template v-else>
    <div>template 404 - neexistuje</div>
  </template>
</template>
